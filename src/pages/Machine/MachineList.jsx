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
  Stack,
  IconButton,
  Box,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import MachineFormModal from "../../Components/forms/Machine/MachineFormModal";
import { ToastContainer, toast } from "react-toastify";

const MachineList = () => {
  const dispatch = useDispatch();
  const { machines, isLoading, isError, errorMessage } = useSelector((state) => state.machines);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [currentMachine, setCurrentMachine] = useState(null);

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
        toast.success("Machine deleted successfully.");
        dispatch(fetchMachines()); // Refresh the machine list
      })
      .catch(() => toast.error("Failed to delete machine."));
  };

  const handleEditMachine = (machine) => {
    setCurrentMachine(machine);
    setShowModal(true);
  };

  const paginatedMachines = machines.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f5f5f5" }}>
      <Box sx={{ width: "90%", maxWidth: "1200px", padding: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: "#333", marginBottom: 3, textAlign: "center" }}>
          Machine List
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ marginBottom: 3 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => {
              setShowModal(true);
              setCurrentMachine(null);
            }}
            sx={{
              borderRadius: 3,
              boxShadow: 2,
              "&:hover": {
                boxShadow: 4,
              },
            }}
          >
            Add New Machine
          </Button>
        </Stack>

        {isLoading && <Typography>Loading...</Typography>}
        {isError && <Typography color="error">Error: {errorMessage}</Typography>}

        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Type</strong></TableCell>
                <TableCell><strong>etat</strong></TableCell>
                <TableCell><strong>salleconsultationnumber</strong></TableCell>



                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedMachines.map((machine) => (
                <TableRow key={machine.id} hover>
                  <TableCell>{machine.nom}</TableCell>
                  <TableCell>{machine.model}</TableCell>
                  <TableCell>{machine.etat}</TableCell>
                  <TableCell>{machine.salleConsultationCode}</TableCell>

                

                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        color="secondary"
                        onClick={() => handleEditMachine(machine)}
                        sx={{
                          "&:hover": {
                            backgroundColor: "#e8f5e9",
                          },
                        }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(machine.id)}
                        sx={{
                          "&:hover": {
                            backgroundColor: "#ffebee",
                          },
                        }}
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
            count={machines.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>

        {showModal && (
          <MachineFormModal
            show={showModal}
            setShow={setShowModal}
            machineToEdit={currentMachine}
          />
        )}

        <ToastContainer />
      </Box>
    </Box>
  );
};

export default MachineList;
