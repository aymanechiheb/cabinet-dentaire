/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid, FormControlLabel, Checkbox } from "@mui/material";
import { useDispatch } from "react-redux";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";

import { registerUser, updateUser,getAllUsers } from "../../Stores/userSlice"; 
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const UserFormModal = ({ show, setShow, user }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    username: "",
    password: "",
    phone: "",
    active: true,
    role: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        lastname: user.lastname,
        username: user.username,
        password: "",
        phone: user.phone,
        active: user.active,
        role: user.role,
      });
    } else {
      setFormData({
        name: "",
        lastname: "",
        username: "",
        password: "",
        phone: "",
        active: true,
        role: "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (user) {
        // Dispatch the edit action with the correct structure
        await dispatch(updateUser({ id: user.id, userData: formData })).unwrap();
        toast.success("User updated successfully.");
        // Dispatch getAllUsers to refresh the user list after updating
        dispatch(getAllUsers());
      } else {
        // Dispatch the add action
        await dispatch(registerUser(formData)).unwrap();
        // Dispatch getAllUsers to refresh the user list after adding
        dispatch(getAllUsers());
  
        toast.success("User added successfully.");
      }
      setShow(false); // Close the modal
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred while saving the user.");
    }
  };
  
  
  
  

  return (
    <Dialog open={show} onClose={() => setShow(false)} fullWidth maxWidth="sm">
      <DialogTitle>{user ? "Edit User" : "Add User"}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="First Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Last Name"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                fullWidth
                required={!user} // Required only for new users
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="active"
                    checked={formData.active}
                    onChange={handleInputChange}
                    color="primary"
                  />
                }
                label="Active"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  label="Role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                >
                  <MenuItem value="USER">User</MenuItem>
                  <MenuItem value="ADMIN">Admin</MenuItem>
                  <MenuItem value="MANAGER">Manager</MenuItem>
                  <MenuItem value="DOCTOR">Doctor</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShow(false)} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          {user ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserFormModal;