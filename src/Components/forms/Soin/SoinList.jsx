/* eslint-disable no-unused-vars */
// src/components/Soin/SoinList.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSoins, deleteSoin } from '../../../Stores/SoinSlice';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import { Add, Edit, Delete, Visibility } from '@mui/icons-material';
import SoinFormModal from './SoinFormModal';

const SoinList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get soins from Redux state
  const { soins, loading, error } = useSelector((state) => state.soins);

  // Local state for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [currentSoin, setCurrentSoin] = useState(null);

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
        toast.success('Soin deleted successfully.');
      })
      .catch(() => {
        toast.error('Failed to delete soin.');
      });
  };

  const handleEditSoin = (soin) => {
    setCurrentSoin(soin);
    setShowModal(true);
  };

  const handleViewSoin = (soin) => {
    toast.info(
      <div style={{ textAlign: 'left' }}>
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

  const paginatedSoins = soins.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ padding: 2, boxShadow: 3 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 600, color: '#333' }}>
        Soin List
      </Typography>

      <Stack direction="row" spacing={2} justifyContent="flex-end" mb={3}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => {
            setShowModal(true);
            setCurrentSoin(null);
          }}
          sx={{
            borderRadius: 3,
            boxShadow: 2,
            '&:hover': {
              boxShadow: 4,
            },
          }}
        >
          Add New Soin
        </Button>
      </Stack>

      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">Error: {error}</Typography>}

      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Code</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell><strong>Prix</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedSoins.map((soin) => (
              <TableRow key={soin.id} hover>
                <TableCell>{soin.code}</TableCell>
                <TableCell>{soin.description}</TableCell>
                <TableCell>{soin.prix}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <IconButton
                      color="primary"
                      onClick={() => handleViewSoin(soin)}
                      sx={{ '&:hover': { backgroundColor: '#e0f7fa' } }}
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleEditSoin(soin)}
                      sx={{ '&:hover': { backgroundColor: '#e8f5e9' } }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteSoin(soin.id)}
                      sx={{ '&:hover': { backgroundColor: '#ffebee' } }}
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
          count={soins.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {showModal && (
        <SoinFormModal
          show={showModal}
          setShow={setShowModal}
          soin={currentSoin}
        />
      )}

      <ToastContainer />
    </Box>
  );
};

export default SoinList;
