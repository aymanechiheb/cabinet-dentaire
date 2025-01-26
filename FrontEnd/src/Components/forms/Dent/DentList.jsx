import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDents, deleteDent } from "../../../Stores/DentSlice";
import { toast } from "react-toastify";
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
  IconButton,
  Box,
  Toolbar,
  TextField,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { Add, Edit, Delete, Visibility } from "@mui/icons-material";
import DentFormModal from "./DentFormModal";

const DentList = () => {
  const dispatch = useDispatch();
  const { dents, loading, error } = useSelector((state) => state.dents);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [currentDent, setCurrentDent] = useState(null);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPosition, setFilterPosition] = useState("");
  const [filterCode, setFilterCode] = useState("");

  useEffect(() => {
    dispatch(getAllDents());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteDent = (id) => {
    dispatch(deleteDent(id))
      .unwrap()
      .then(() => {
        setToastMessage("Dent deleted successfully.");
        setOpenToast(true);
        dispatch(getAllDents());
      })
      .catch(() => {
        setToastMessage("Failed to delete dent.");
        setOpenToast(true);
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

  const handleAddNew = () => {
    setCurrentDent(null);
    setShowModal(true);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePositionFilterChange = (e) => {
    setFilterPosition(e.target.value);
  };

  const handleCodeFilterChange = (e) => {
    setFilterCode(e.target.value);
  };

  const filteredDents = dents.filter((dent) => {
    const matchesSearch =
      dent.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dent.code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPosition = filterPosition === "" || dent.position === filterPosition;
    const matchesCode = filterCode === "" || dent.code === filterCode;

    return matchesSearch && matchesPosition && matchesCode;
  });

  const paginatedDents = filteredDents.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f0f4f8", minHeight: "100vh" }}>
      {/* Header */}
      <Paper elevation={3} sx={{ marginBottom: 3, padding: 2, backgroundColor: "#e3f2fd" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "#1565c0" }}>
            Dent Management
          </Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#1976d2", "&:hover": { backgroundColor: "#1565c0" } }}
            startIcon={<Add />}
            onClick={handleAddNew}
          >
            Add New Dent
          </Button>
        </Toolbar>
      </Paper>

      {/* Filters */}
      <Paper elevation={3} sx={{ marginBottom: 3, padding: 2, backgroundColor: "#f3e5f5" }}>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField
            label="Search by Position or Code"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ flex: 2, backgroundColor: "#ffffff" }}
          />
          <Select
            value={filterPosition}
            onChange={handlePositionFilterChange}
            displayEmpty
            fullWidth
            sx={{ flex: 1, backgroundColor: "#ffffff" }}
          >
            <MenuItem value="">All Positions</MenuItem>
            {[...new Set(dents.map((dent) => dent.position))].map((position) => (
              <MenuItem key={position} value={position}>
                {position}
              </MenuItem>
            ))}
          </Select>
          <Select
            value={filterCode}
            onChange={handleCodeFilterChange}
            displayEmpty
            fullWidth
            sx={{ flex: 1, backgroundColor: "#ffffff" }}
          >
            <MenuItem value="">All Codes</MenuItem>
            {[...new Set(dents.map((dent) => dent.code))].map((code) => (
              <MenuItem key={code} value={code}>
                {code}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Paper>

      {/* Dent Table */}
      <TableContainer component={Paper} elevation={3} sx={{ backgroundColor: "#e8f5e9" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#81c784" }}>
            <TableRow>
              <TableCell sx={{ color: "#ffffff" }}>Position</TableCell>
              <TableCell sx={{ color: "#ffffff" }}>Code</TableCell>
              <TableCell sx={{ color: "#ffffff", textAlign: "center" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3}>Loading...</TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={3}>Error: {error}</TableCell>
              </TableRow>
            ) : paginatedDents.length > 0 ? (
              paginatedDents.map((dent) => (
                <TableRow key={dent.id} sx={{ "&:hover": { backgroundColor: "#f1f8e9" } }}>
                  <TableCell>{dent.position}</TableCell>
                  <TableCell>{dent.code}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <IconButton
                      sx={{ color: "#64b5f6" }}
                      onClick={() => handleViewDent(dent)}
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      sx={{ color: "#64b5f6" }}
                      onClick={() => handleEditDent(dent)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      sx={{ color: "#e57373" }}
                      onClick={() => handleDeleteDent(dent.id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3}>No dents found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={filteredDents.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Modal */}
      {showModal && (
        <DentFormModal
          show={showModal}
          setShow={setShowModal}
          dent={currentDent}
          onSuccess={() => dispatch(getAllDents())}
        />
      )}

      {/* Snackbar */}
      <Snackbar open={openToast} autoHideDuration={3000} onClose={() => setOpenToast(false)}>
        <Alert severity="success" onClose={() => setOpenToast(false)}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DentList;