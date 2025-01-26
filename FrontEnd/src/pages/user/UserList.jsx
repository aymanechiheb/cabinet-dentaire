import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, deleteUser } from "../../Stores/userSlice";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Toolbar,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import HistoryIcon from "@mui/icons-material/History";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import UserFormModal from "../../Components/User/UserFormModal";

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users = [], loading, error } = useSelector((state) => state.users || {});

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterRole, setFilterRole] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id))
      .unwrap()
      .then(() => {
        toast.success("User deleted successfully.");
        dispatch(getAllUsers());
      })
      .catch((err) => {
        toast.error(err.message || "Failed to delete user.");
      });
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleViewHistory = (userId) => {
    navigate(`/appointments/user/${userId}`);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "" ||
      (filterStatus === "active" && user.active) ||
      (filterStatus === "inactive" && !user.active);

    const matchesRole = filterRole === "" || user.role === filterRole;

    return matchesSearch && matchesStatus && matchesRole;
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ padding: 3, backgroundColor: "#F7F7F7", minHeight: "100vh" }}>
      <Paper elevation={3} sx={{ marginBottom: 3, padding: 2, backgroundColor: "#4ABDAC" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "#FFFFFF" }}>
            User Management
          </Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#FC4A1A", "&:hover": { backgroundColor: "#E43A1A" } }}
            onClick={() => {
              setSelectedUser(null);
              setShowModal(true);
            }}
          >
            Add New User
          </Button>
        </Toolbar>
      </Paper>

      <Paper elevation={3} sx={{ marginBottom: 3, padding: 2, backgroundColor: "#DFDCE3" }}>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField
            label="Search by Name or Username"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flex: 2, backgroundColor: "#FFFFFF" }}
          />
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            displayEmpty
            fullWidth
            sx={{ flex: 1, backgroundColor: "#FFFFFF" }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>
          <Select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            displayEmpty
            fullWidth
            sx={{ flex: 1, backgroundColor: "#FFFFFF" }}
          >
            <MenuItem value="">All Roles</MenuItem>
            <MenuItem value="USER">User</MenuItem>
            <MenuItem value="MANAGER">Manager</MenuItem>
            <MenuItem value="DOCTOR">Doctor</MenuItem>
            <MenuItem value="ADMIN">Admin</MenuItem>
          </Select>
        </Box>
      </Paper>

      <TableContainer component={Paper} elevation={3} sx={{ backgroundColor: "#F7F7F7" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#4ABDAC" }}>
            <TableRow>
              <TableCell sx={{ color: "#FFFFFF" }}>Full Name</TableCell>
              <TableCell sx={{ color: "#FFFFFF" }}>Username</TableCell>
              <TableCell sx={{ color: "#FFFFFF" }}>Phone</TableCell>
              <TableCell sx={{ color: "#FFFFFF" }}>Role</TableCell>
              <TableCell sx={{ color: "#FFFFFF" }}>Status</TableCell>
              <TableCell sx={{ color: "#FFFFFF", textAlign: "center" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6}>Loading...</TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={6}>Error: {error}</TableCell>
              </TableRow>
            ) : paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <TableRow key={user.id} sx={{ "&:hover": { backgroundColor: "#DFDCE3" } }}>
                  <TableCell>
                    {user.name} {user.lastname}
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.active ? "Active" : "Inactive"}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <IconButton
                      sx={{ color: "#4ABDAC" }}
                      onClick={() => handleEditUser(user)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      sx={{ color: "#FC4A1A" }}
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    {user.role === "DOCTOR" && (
                      <IconButton
                        sx={{ color: "#4ABDAC" }}
                        onClick={() => handleViewHistory(user.id)}
                      >
                        <HistoryIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6}>No users found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <UserFormModal
        show={showModal}
        setShow={setShowModal}
        user={selectedUser}
        onUserAddedOrUpdated={() => dispatch(getAllUsers())}
      />
    </Box>
  );
};

export default UserList;