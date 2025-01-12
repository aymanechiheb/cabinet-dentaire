/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// src/components/Soin/SoinFormModal.js

import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux'; // Use Redux dispatch
import { addSoin, updateSoin } from '../../../Stores/SoinSlice'; // Import actions
import { toast } from 'react-toastify';

const SoinFormModal = ({ show, setShow, soin }) => {
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    prix: 0,
  });

  const dispatch = useDispatch(); // Initialize dispatch for Redux actions

  useEffect(() => {
    if (soin) {
      setFormData({
        code: soin.code,
        description: soin.description,
        prix: soin.prix,
      });
    }
  }, [soin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (soin) {
        // Dispatch update action
        await dispatch(updateSoin({ id: soin.id, ...formData }));
        toast.success('Soin updated successfully.');
      } else {
        // Dispatch create action
        await dispatch(addSoin(formData));
        toast.success('Soin created successfully.');
      }
      setShow(false); // Close modal after success
    } catch (error) {
      toast.error('Failed to save soin.');
    }
  };

  return (
    <Modal open={show} onClose={() => setShow(false)}>
      <Box sx={{ padding: 4, backgroundColor: 'white', maxWidth: 400, margin: 'auto', marginTop: '10%' }}>
        <Typography variant="h6">{soin ? 'Edit Soin' : 'Add New Soin'}</Typography>
        <TextField
          label="Code"
          name="code"
          value={formData.code}
          onChange={handleChange}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Prix"
          name="prix"
          value={formData.prix}
          onChange={handleChange}
          fullWidth
          type="number"
          sx={{ marginBottom: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
        >
          {soin ? 'Update Soin' : 'Add Soin'}
        </Button>
      </Box>
    </Modal>
  );
};

export default SoinFormModal;
