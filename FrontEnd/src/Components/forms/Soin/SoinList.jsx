import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSoins, deleteSoin } from "../../../Stores/SoinSlice";
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
import SoinFormModal from "./SoinFormModal";

const SoinList = () => {
  const dispatch = useDispatch();
  const { soins, loading, error } = useSelector((state) => state.soins);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [currentSoin, setCurrentSoin] = useState(null);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCode, setFilterCode] = useState("");
  const [filterPrix, setFilterPrix] = useState("");

  useEffect(() => {
    dispatch(fetchSoins());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteSoin = (id) => {
    dispatch(deleteSoin(id))
      .unwrap()
      .then(() => {
        setToastMessage("Soin deleted successfully.");
        setOpenToast(true);
        dispatch(fetchSoins());
      })
      .catch(() => {
        setToastMessage("Failed to delete soin.");
        setOpenToast(true);
      });
  };

  const handleEditSoin = (soin) => {
    setCurrentSoin(soin);
    setShowModal(true);
  };

  const handleViewSoin = (soin) => {
    toast.info(
      <div style={{ textAlign: "left" }}>
        <strong>Soin Information</strong>
        <p><strong>Code:</strong> {soin.code}</p>
        <p><strong>Description:</strong> {soin.description}</p>
        <p><strong>Prix:</strong> {soin.prix}</p>
      </div>,
      {
        autoClose: 8000,
        pauseOnHover: true,
      }
    );
  };

  const handleAddNew = () => {
    setCurrentSoin(null);
    setShowModal(true);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCodeFilterChange = (e) => {
    setFilterCode(e.target.value);
  };

  const handlePrixFilterChange = (e) => {
    setFilterPrix(e.target.value);
  };

  const filteredSoins = soins.filter((soin) => {
    const matchesSearch =
      soin.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      soin.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCode = filterCode === "" || soin.code === filterCode;
    const matchesPrix = filterPrix === "" || soin.prix === parseFloat(filterPrix);

    return matchesSearch && matchesCode && matchesPrix;
  });

  const paginatedSoins = filteredSoins.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f0f4f8", minHeight: "100vh" }}>
      {/* Header */}
      <Paper elevation={3} sx={{ marginBottom: 3, padding: 2, backgroundColor: "#e3f2fd" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "#1565c0" }}>
            Soin Management
          </Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#1976d2", "&:hover": { backgroundColor: "#1565c0" } }}
            startIcon={<Add />}
            onClick={handleAddNew}
          >
            Add New Soin
          </Button>
        </Toolbar>
      </Paper>

      {/* Filters */}
      <Paper elevation={3} sx={{ marginBottom: 3, padding: 2, backgroundColor: "#f3e5f5" }}>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField
            label="Search by Code or Description"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ flex: 2, backgroundColor: "#ffffff" }}
          />
          <Select
            value={filterCode}
            onChange={handleCodeFilterChange}
            displayEmpty
            fullWidth
            sx={{ flex: 1, backgroundColor: "#ffffff" }}
          >
            <MenuItem value="">All Codes</MenuItem>
            {[...new Set(soins.map((soin) => soin.code))].map((code) => (
              <MenuItem key={code} value={code}>
                {code}
              </MenuItem>
            ))}
          </Select>
          <Select
            value={filterPrix}
            onChange={handlePrixFilterChange}
            displayEmpty
            fullWidth
            sx={{ flex: 1, backgroundColor: "#ffffff" }}
          >
            <MenuItem value="">All Prix</MenuItem>
            {[...new Set(soins.map((soin) => soin.prix))].map((prix) => (
              <MenuItem key={prix} value={prix}>
                {prix}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Paper>

      {/* Soin Table */}
      <TableContainer component={Paper} elevation={3} sx={{ backgroundColor: "#e8f5e9" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#81c784" }}>
            <TableRow>
              <TableCell sx={{ color: "#ffffff" }}>Code</TableCell>
              <TableCell sx={{ color: "#ffffff" }}>Description</TableCell>
              <TableCell sx={{ color: "#ffffff" }}>Prix</TableCell>
              <TableCell sx={{ color: "#ffffff", textAlign: "center" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4}>Loading...</TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={4}>Error: {error}</TableCell>
              </TableRow>
            ) : paginatedSoins.length > 0 ? (
              paginatedSoins.map((soin) => (
                <TableRow key={soin.id} sx={{ "&:hover": { backgroundColor: "#f1f8e9" } }}>
                  <TableCell>{soin.code}</TableCell>
                  <TableCell>{soin.description}</TableCell>
                  <TableCell>{soin.prix}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <IconButton
                      sx={{ color: "#64b5f6" }}
                      onClick={() => handleViewSoin(soin)}
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      sx={{ color: "#64b5f6" }}
                      onClick={() => handleEditSoin(soin)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      sx={{ color: "#e57373" }}
                      onClick={() => handleDeleteSoin(soin.id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>No soins found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={filteredSoins.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Modal */}
      {showModal && (
        <SoinFormModal
          show={showModal}
          setShow={setShowModal}
          soin={currentSoin}
          onSuccess={() => dispatch(fetchSoins())}
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

export default SoinList;