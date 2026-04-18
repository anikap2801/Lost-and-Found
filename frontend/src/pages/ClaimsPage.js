import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Alert,
  Chip,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { claimsAPI } from '../services/api';

const ClaimsPage = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    itemId: '',
    claimantId: '',
    proofOfOwnership: '',
    status: 'PENDING',
  });

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      setLoading(true);
      const response = await claimsAPI.getAll();
      setClaims(response.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching claims:', err);
      setError('Failed to load claims');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (claim = null) => {
    if (claim) {
      setEditingId(claim.id);
      setFormData(claim);
    } else {
      setEditingId(null);
      setFormData({
        itemId: '',
        claimantId: '',
        proofOfOwnership: '',
        status: 'PENDING',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingId(null);
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await claimsAPI.update(editingId, formData);
      } else {
        await claimsAPI.create(formData);
      }
      await fetchClaims();
      handleCloseDialog();
      setError(null);
    } catch (err) {
      console.error('Error saving claim:', err);
      setError('Failed to save claim');
    }
  };

  const handleApprove = async (id) => {
    try {
      await claimsAPI.approveClaim(id);
      await fetchClaims();
      setError(null);
    } catch (err) {
      console.error('Error approving claim:', err);
      setError('Failed to approve claim');
    }
  };

  const handleReject = async (id) => {
    try {
      await claimsAPI.rejectClaim(id);
      await fetchClaims();
      setError(null);
    } catch (err) {
      console.error('Error rejecting claim:', err);
      setError('Failed to reject claim');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this claim?')) {
      try {
        await claimsAPI.delete(id);
        await fetchClaims();
        setError(null);
      } catch (err) {
        console.error('Error deleting claim:', err);
        setError('Failed to delete claim');
      }
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      PENDING: 'warning',
      APPROVED: 'success',
      REJECTED: 'error',
    };
    return colors[status] || 'default';
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <h2>Claims Management</h2>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          New Claim
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Item ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Claimant ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Proof</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {claims.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                    No claims found
                  </TableCell>
                </TableRow>
              ) : (
                claims.map((claim) => (
                  <TableRow
                    key={claim.id}
                    sx={{
                      '&:hover': { backgroundColor: '#f9f9f9' },
                      '&:last-child td': { border: 0 },
                    }}
                  >
                    <TableCell>{claim.id}</TableCell>
                    <TableCell>{claim.itemId}</TableCell>
                    <TableCell>{claim.claimantId}</TableCell>
                    <TableCell>
                      <Chip
                        label={claim.status}
                        color={getStatusColor(claim.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{claim.proofOfOwnership?.substring(0, 20)}...</TableCell>
                    <TableCell align="right">
                      {claim.status === 'PENDING' && (
                        <>
                          <IconButton
                            size="small"
                            color="success"
                            onClick={() => handleApprove(claim.id)}
                            title="Approve"
                          >
                            <CheckIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleReject(claim.id)}
                            title="Reject"
                          >
                            <ClearIcon />
                          </IconButton>
                        </>
                      )}
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleOpenDialog(claim)}
                        title="Edit"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(claim.id)}
                        title="Delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingId ? 'Edit Claim' : 'Create New Claim'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            fullWidth
            label="Item ID"
            type="number"
            value={formData.itemId}
            onChange={(e) =>
              setFormData({ ...formData, itemId: e.target.value })
            }
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Claimant ID"
            type="number"
            value={formData.claimantId}
            onChange={(e) =>
              setFormData({ ...formData, claimantId: e.target.value })
            }
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Proof of Ownership"
            value={formData.proofOfOwnership}
            onChange={(e) =>
              setFormData({ ...formData, proofOfOwnership: e.target.value })
            }
            margin="normal"
            multiline
            rows={3}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              label="Status"
            >
              <MenuItem value="PENDING">Pending</MenuItem>
              <MenuItem value="APPROVED">Approved</MenuItem>
              <MenuItem value="REJECTED">Rejected</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSave}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ClaimsPage;
