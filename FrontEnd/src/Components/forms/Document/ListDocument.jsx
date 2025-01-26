import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDocuments,
  downloadDocument,
  addDocument,
  deleteDocument,
} from "../../../Stores/DocumentSlice";
import { toast, ToastContainer } from "react-toastify";
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
  Box,
  Toolbar,
} from "@mui/material";
import { Visibility, Download, Delete, Add } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

const ListDocument = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  // Ensure patientId is correctly extracted from location.state
  const patientId = location.state?.patientId || null;

  const { documents, loading, error } = useSelector((state) => state.documents);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newDocument, setNewDocument] = useState({ file: null });
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

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
          <strong>File URL:</strong>{" "}
          <a href={document.fileUrl} target="_blank" rel="noopener noreferrer">
            {document.fileUrl}
          </a>
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
    <Box sx={{ padding: 3, backgroundColor: "#f0f4f8", minHeight: "100vh" }}>
      {/* Header */}
      <Paper elevation={3} sx={{ marginBottom: 3, padding: 2, backgroundColor: "#e3f2fd" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "#1565c0" }}>
            Document Management
          </Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#1976d2", "&:hover": { backgroundColor: "#1565c0" } }}
            startIcon={<Add />}
            onClick={handleOpenAddModal}
          >
            Add New Document
          </Button>
        </Toolbar>
      </Paper>

      {/* Table */}
      <TableContainer component={Paper} elevation={3} sx={{ backgroundColor: "#e8f5e9" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#81c784" }}>
            <TableRow>
              <TableCell sx={{ color: "#ffffff" }}>Title</TableCell>
              <TableCell sx={{ color: "#ffffff", textAlign: "center" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={2}>Loading...</TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={2}>Error: {error}</TableCell>
              </TableRow>
            ) : paginatedDocuments.length > 0 ? (
              paginatedDocuments.map((document) => (
                <TableRow key={document.id} sx={{ "&:hover": { backgroundColor: "#f1f8e9" } }}>
                  <TableCell>{document.id}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <IconButton
                        sx={{ color: "#64b5f6" }}
                        onClick={() => handleViewDocument(document)}
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton
                        sx={{ color: "#64b5f6" }}
                        onClick={() => handleDownloadDocument(document.id)}
                      >
                        <Download />
                      </IconButton>
                      <IconButton
                        sx={{ color: "#e57373" }}
                        onClick={() => handleDeleteDocument(document.id)}
                      >
                        <Delete />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2}>No documents found.</TableCell>
              </TableRow>
            )}
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

      {/* Add Document Modal */}
      <Dialog open={addModalOpen} onClose={handleCloseAddModal} fullWidth maxWidth="sm">
        <DialogTitle>Add New Document</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Button variant="contained" component="label">
              Upload File
              <input
                type="file"
                hidden
                onChange={(e) => setNewDocument({ ...newDocument, file: e.target.files[0] })}
              />
            </Button>
            {newDocument.file && (
              <Typography variant="body2" color="textSecondary">
                Selected file: {newDocument.file.name}
              </Typography>
            )}
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

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Box>
  );
};

export default ListDocument;