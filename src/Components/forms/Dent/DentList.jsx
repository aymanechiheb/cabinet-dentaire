/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDents, deleteDent } from "../../../Stores/DentSlice"; 
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
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
  Box,
} from "@mui/material";
import { Add, Edit, Delete, Visibility } from "@mui/icons-material"; // Icons

import DentFormModal from "./DentFormModal"; 

const DentList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Use useSelector to access Redux state
  const { dents, loading, error } = useSelector((state) => state.dents);

  // Local state for pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Modal state
  const [showModal, setShowModal] = React.useState(false);
  const [currentDent, setCurrentDent] = React.useState(null);

  useEffect(() => {
    dispatch(getAllDents()); // Fetch all dents when component mounts
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteDent = async (id) => {
    dispatch(deleteDent(id)) // Dispatch delete action
      .unwrap()
      .then(() => {
        toast.success("Dent deleted successfully.");
        dispatch(getAllDents()); // Refresh dent list after delete
      })
      .catch(() => {
        toast.error("Failed to delete dent.");
      });
  };

  const handleEditDent = (dent) => {
    setCurrentDent(dent);
    setShowModal(true);
  };

  const handleViewDent = (dent) => {
    toast.info(
      <div style={{ textAlign: "left" }}>
        <strong>Dent Information</strong>
        <p><strong>Position:</strong> {dent.position}</p>
        <p><strong>Code:</strong> {dent.code}</p>
      </div>,
      {
        autoClose: 8000,
        pauseOnHover: true,
      }
    );
  };

  const handleAddDent = () => {
    setShowModal(true);
    setCurrentDent(null);
  };

  const paginatedDents = dents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ padding: 3, boxShadow: 5, borderRadius: 2, backgroundColor: "#f9f9f9" }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 700, color: "#333" }}>
        Dent List
      </Typography>
      <div className="h-screen bg-blue-500 flex items-center justify-center">
      <h1 className="text-4xl font-bold text-white">Tailwind CSS is Working!</h1>
    </div>

      <Stack direction="row" spacing={2} justifyContent="flex-end" mb={3}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleAddDent}
          sx={{
            borderRadius: 3,
            boxShadow: 3,
            "&:hover": {
              boxShadow: 6,
            },
          }}
        >
          Add New Dent
        </Button>
      </Stack>

      {loading && <Typography variant="h6" color="textSecondary">Loading...</Typography>}
      {error && <Typography color="error">Error: {error}</Typography>}

      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3, backgroundColor: "#fff" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f0f0f0" }}>Position</TableCell>
              <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f0f0f0" }}>Code</TableCell>
              <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f0f0f0" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedDents.map((dent) => (
              <TableRow key={dent.id} hover sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}>
                <TableCell>{dent.position}</TableCell>
                <TableCell>{dent.code}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <IconButton
                      color="primary"
                      onClick={() => handleViewDent(dent)}
                      sx={{ "&:hover": { backgroundColor: "#e0f7fa" } }}
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleEditDent(dent)}
                      sx={{ "&:hover": { backgroundColor: "#e8f5e9" } }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteDent(dent.id)}
                      sx={{ "&:hover": { backgroundColor: "#ffebee" } }}
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
          count={dents.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {showModal && (
        <DentFormModal
          show={showModal}
          setShow={setShowModal}
          dent={currentDent}
          onSuccess={() => {
            dispatch(getAllDents()); // Refresh the dent list after a successful form submission
          }}
        />
      )}

      <ToastContainer />
    </Box>
  );
};

export default DentList;
