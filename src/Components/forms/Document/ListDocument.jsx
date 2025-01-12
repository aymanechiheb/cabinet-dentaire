/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDocuments,
  downloadDocument,
  addDocument,
  deleteDocument,
} from "../../../Stores/DocumentSlice"; // Redux actions
import { ToastContainer, toast } from "react-toastify";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Button,
  Paper,
  Typography,
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { Visibility, Download, Delete, Add } from "@mui/icons-material"; // Added Icons
import { useLocation } from "react-router-dom";

const ListDocument = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  
  // Ensure patientId is correctly extracted from location.state
  const patientId = location.state?.patientId || null;
  
  // Log to verify patientId
  console.log("Patient ID:", patientId);

  const { documents, loading, error } = useSelector((state) => state.documents);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newDocument, setNewDocument] = useState({ title: "", description: "", file: null });

  useEffect(() => {
    if (patientId) {
      dispatch(fetchDocuments(patientId));
    }
  }, [dispatch, patientId]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewDocument = (document) => {
    toast.info(
      <div style={{ textAlign: "left" }}>
        <strong>Document Information</strong>
        <p>
          <strong>Title:</strong> {document.id}
        </p>
        <p>
          <strong>Description:</strong> {document.description}
        </p>
        <p>
          <strong>File URL:</strong> <a href={document.fileUrl} target="_blank" rel="noopener noreferrer">{document.fileUrl}</a>
        </p>
      </div>,
      {
        autoClose: 8000,
        pauseOnHover: true,
      }
    );
  };

  const handleDownloadDocument = async (documentId) => {
    try {
      const fileContent = await dispatch(downloadDocument(documentId)).unwrap();
      const blob = new Blob([fileContent], { type: "application/octet-stream" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `document_${documentId}.pdf`;
      link.click();
      toast.success("Document is downloading...");
    } catch (error) {
      toast.error("Failed to download the document.");
    }
  };

  const handleDeleteDocument = async (documentId) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      try {
        await dispatch(deleteDocument(documentId)).unwrap();
        toast.success("Document deleted successfully.");
      } catch (error) {
        toast.error("Failed to delete the document.");
      }
    }
  };

  const handleOpenAddModal = () => setAddModalOpen(true);
  const handleCloseAddModal = () => setAddModalOpen(false);

  const handleAddDocument = async () => {
  if (!patientId) {
    toast.error("Patient ID is missing.");
    return;
  }

  if (isNaN(patientId)) {
    toast.error("Invalid Patient ID.");
    return;
  }

  if (!newDocument.file) {
    toast.error("Please select a file to upload.");
    return;
  }

  try {
    // Dispatch action to add the document with only patientId and file
    await dispatch(addDocument({ patientId, file: newDocument.file })).unwrap();
    toast.success("Document added successfully.");
    setNewDocument({ file: null }); // Clear file input after success
    handleCloseAddModal();
  } catch (error) {
    toast.error("Failed to add the document.");
  }
};

  

  const paginatedDocuments = Array.isArray(documents)
    ? documents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : [];

  return (
    <Paper elevation={3} style={{ padding: "1.5rem" }}>
      <Typography variant="h4" gutterBottom>
        Document List
      </Typography>

      <Stack direction="row" spacing={2} justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleOpenAddModal}
        >
          Add New Document
        </Button>
      </Stack>

      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">Error: {error}</Typography>}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedDocuments.map((document) => (
              <TableRow key={document.id}>
                <TableCell>{ document.id}</TableCell>
                <TableCell>{ "N/A"}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <IconButton
                      color="primary"
                      onClick={() => handleViewDocument(document)}
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDownloadDocument(document.id)}
                    >
                      <Download />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteDocument(document.id)}
                    >
                      <Delete />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={documents.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Dialog open={addModalOpen} onClose={handleCloseAddModal} fullWidth maxWidth="sm">
        <DialogTitle>Add New Document</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
           
            <Button
              variant="contained"
              component="label"
            >
              Upload File
              <input
                type="file"
                hidden
                onChange={(e) => setNewDocument({ ...newDocument, file: e.target.files[0] })}
              />
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddDocument} color="primary" variant="contained">
            Add Document
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </Paper>
  );
};

export default ListDocument;
