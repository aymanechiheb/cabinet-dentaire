import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMachines, deleteMachine } from "../../Stores/MachineSlice";
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
import { Add, Edit, Delete } from "@mui/icons-material";
import MachineFormModal from "../../Components/forms/Machine/MachineFormModal";

const MachineList = () => {
  const dispatch = useDispatch();
  const { machines, isLoading, isError, errorMessage } = useSelector((state) => state.machines);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [currentMachine, setCurrentMachine] = useState(null);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterEtat, setFilterEtat] = useState("");

  useEffect(() => {
    dispatch(fetchMachines());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id) => {
    dispatch(deleteMachine(id))
      .unwrap()
      .then(() => {
        setToastMessage("Machine deleted successfully.");
        setOpenToast(true);
        dispatch(fetchMachines()); // Refresh the machine list
      })
      .catch(() => {
        setToastMessage("Failed to delete machine.");
        setOpenToast(true);
      });
  };

  const handleEditMachine = (machine) => {
    setCurrentMachine(machine);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setCurrentMachine(null);
    setShowModal(true);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTypeFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleEtatFilterChange = (e) => {
    setFilterEtat(e.target.value);
  };

  const filteredMachines = machines.filter((machine) => {
    const matchesSearch =
      machine.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      machine.model.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === "" || machine.model === filterType;
    const matchesEtat = filterEtat === "" || machine.etat === filterEtat;

    return matchesSearch && matchesType && matchesEtat;
  });

  const paginatedMachines = filteredMachines.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f0f4f8", minHeight: "100vh" }}>
      {/* Header */}
      <Paper elevation={3} sx={{ marginBottom: 3, padding: 2, backgroundColor: "#e3f2fd" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "#1565c0" }}>
            Machine Management
          </Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#1976d2", "&:hover": { backgroundColor: "#1565c0" } }}
            startIcon={<Add />}
            onClick={handleAddNew}
          >
            Add New Machine
          </Button>
        </Toolbar>
      </Paper>

      {/* Filters */}
      <Paper elevation={3} sx={{ marginBottom: 3, padding: 2, backgroundColor: "#f3e5f5" }}>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField
            label="Search by Name or Type"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ flex: 2, backgroundColor: "#ffffff" }}
          />
          <Select
            value={filterType}
            onChange={handleTypeFilterChange}
            displayEmpty
            fullWidth
            sx={{ flex: 1, backgroundColor: "#ffffff" }}
          >
            <MenuItem value="">All Types</MenuItem>
            {[...new Set(machines.map((machine) => machine.model))].map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
          <Select
            value={filterEtat}
            onChange={handleEtatFilterChange}
            displayEmpty
            fullWidth
            sx={{ flex: 1, backgroundColor: "#ffffff" }}
          >
            <MenuItem value="">All States</MenuItem>
            {[...new Set(machines.map((machine) => machine.etat))].map((etat) => (
              <MenuItem key={etat} value={etat}>
                {etat}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Paper>

      {/* Machine Table */}
      <TableContainer component={Paper} elevation={3} sx={{ backgroundColor: "#e8f5e9" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#81c784" }}>
            <TableRow>
              <TableCell sx={{ color: "#ffffff" }}>Name</TableCell>
              <TableCell sx={{ color: "#ffffff" }}>Type</TableCell>
              <TableCell sx={{ color: "#ffffff" }}>State</TableCell>
              <TableCell sx={{ color: "#ffffff" }}>Consultation Room</TableCell>
              <TableCell sx={{ color: "#ffffff", textAlign: "center" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5}>Loading...</TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={5}>Error: {errorMessage}</TableCell>
              </TableRow>
            ) : paginatedMachines.length > 0 ? (
              paginatedMachines.map((machine) => (
                <TableRow key={machine.id} sx={{ "&:hover": { backgroundColor: "#f1f8e9" } }}>
                  <TableCell>{machine.nom}</TableCell>
                  <TableCell>{machine.model}</TableCell>
                  <TableCell>{machine.etat}</TableCell>
                  <TableCell>{machine.salleConsultationCode}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <IconButton
                      sx={{ color: "#64b5f6" }}
                      onClick={() => handleEditMachine(machine)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      sx={{ color: "#e57373" }}
                      onClick={() => handleDelete(machine.id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>No machines found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={filteredMachines.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Modal */}
      {showModal && (
        <MachineFormModal
          show={showModal}
          setShow={setShowModal}
          machineToEdit={currentMachine}
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

export default MachineList;