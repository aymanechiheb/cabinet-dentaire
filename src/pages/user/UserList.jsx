import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, deleteUser } from "../../Stores/userSlice";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import HistoryIcon from "@mui/icons-material/History"; // Import the History icon
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import UserFormModal from '../../Components/User/UserFormModal';

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const { users = [], loading, error } = useSelector((state) => state.users || {});

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id))
      .unwrap()
      .then(() => {
        toast.success("User deleted successfully.");
        dispatch(getAllUsers()); // Refresh the list after deletion
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
    navigate(`/appointments/user/${userId}`); // Navigate to the appointments list for the user
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setSelectedUser(null);
          setShowModal(true);
        }}
      >
        Add New User
      </Button>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7}>Loading...</TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={7}>Error: {error}</TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name} {user.lastname}</TableCell> {/* Full Name */}
                  <TableCell>{user.username}</TableCell> {/* Username */}
                  <TableCell>{user.phone}</TableCell> {/* Phone */}
                  <TableCell>{user.role}</TableCell> {/* Role */}
                  <TableCell>{user.active ? "Active" : "Inactive"}</TableCell> {/* Status */}
                  <TableCell>
                    <IconButton onClick={() => handleEditUser(user)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteUser(user.id)}>
                      <DeleteIcon />
                    </IconButton>
                    {/* Conditionally render the History button for DOCTOR role */}
                    {user.role === "DOCTOR" && (
                      <IconButton onClick={() => handleViewHistory(user.id)}>
                        <HistoryIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <UserFormModal 
        show={showModal} 
        setShow={setShowModal} 
        user={selectedUser} 
        onUserAddedOrUpdated={() => dispatch(getAllUsers())} // Refresh the list after adding/editing
      />
    </>
  );
};

export default UserList;