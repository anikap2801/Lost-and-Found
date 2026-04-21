import React, { useState, useEffect } from 'react';
import {
  Box, Button, Paper, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, CircularProgress, Alert,
  Chip, IconButton, Select, MenuItem, FormControl,
  InputLabel, Typography
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

import { claimsAPI, itemsAPI } from '../services/api';

const ClaimsPage = () => {
  const [claims, setClaims] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);

  const [formData, setFormData] = useState({
    itemId: '',
    proofDescription: '',
    proofImage: ''
  });

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchClaims();
    fetchItems();
  }, []);

  // ✅ Fetch ALL claims (IMPORTANT: requires /claims/all)
  const fetchClaims = async () => {
    try {
      setLoading(true);
      const res = await claimsAPI.getAll();
      const allClaims = res.data || [];

      // 🔥 Role-based filtering
      let filtered = allClaims;

      if (user.role === "Claimant") {
        filtered = allClaims.filter(c => c.claimant?.id === user.id);
      } else if (user.role === "Reporter") {
        filtered = allClaims.filter(c => c.item?.reporter?.id === user.id);
      }

      setClaims(filtered);
      setError(null);
    } catch {
      setError("Failed to load claims");
    } finally {
      setLoading(false);
    }
  };

  const fetchItems = async () => {
    try {
      const res = await itemsAPI.getAll();
      setItems(res.data || []);
    } catch {
      setError("Failed to load items");
    }
  };

  const handleSave = async () => {
    try {
      await claimsAPI.create({
        itemId: formData.itemId,
        claimantId: user.id,
        proofDescription: formData.proofDescription,
        proofImage: formData.proofImage
      });

      fetchClaims();
      setOpenDialog(false);

      setFormData({
        itemId: '',
        proofDescription: '',
        proofImage: ''
      });

    } catch {
      setError("Failed to create claim");
    }
  };

  const handleApprove = async (id) => {
    await claimsAPI.review(id, 'APPROVED', user.id, '');
    fetchClaims();
  };

  const handleReject = async (id) => {
    await claimsAPI.review(id, 'REJECTED', user.id, '');
    fetchClaims();
  };

  const getStatusColor = (status) => ({
    SUBMITTED: 'warning',
    APPROVED: 'success',
    REJECTED: 'error'
  }[status] || 'default');

  // 🔥 GROUPING
  const submitted = claims.filter(c => c.status === "SUBMITTED");
  const approved = claims.filter(c => c.status === "APPROVED");
  const rejected = claims.filter(c => c.status === "REJECTED");

  // 🔥 Reusable grid
  const GridSection = ({ title, data }) => (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>{title}</Typography>

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))',
        gap: 3
      }}>
        {data.length === 0 ? (
          <Typography>No claims</Typography>
        ) : (
          data.map(claim => (
            <Paper key={claim.id} sx={{ p: 2, borderRadius: 3 }}>

              <Typography variant="h6">
                {claim.item?.name}
              </Typography>

              <Typography variant="body2">
                👤 {claim.claimant?.name}
              </Typography>

              <Chip
                label={claim.status}
                color={getStatusColor(claim.status)}
                size="small"
                sx={{ mt: 1 }}
              />

              <Typography sx={{ mt: 1 }}>
                {claim.proofDescription}
              </Typography>

              {claim.proofImage && (
                <Box
                  component="img"
                  src={claim.proofImage}
                  sx={{
                    width: '100%',
                    height: 150,
                    objectFit: 'cover',
                    mt: 2,
                    borderRadius: 2
                  }}
                />
              )}

              {/* ✅ Moderator actions */}
              {user.role === "Moderator" && claim.status === "SUBMITTED" && (
                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  <IconButton color="success" onClick={() => handleApprove(claim.id)}>
                    <CheckIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleReject(claim.id)}>
                    <ClearIcon />
                  </IconButton>
                </Box>
              )}

            </Paper>
          ))
        )}
      </Box>
    </Box>
  );

  return (
    <Box>

      {/* HEADER */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Claims</Typography>

        {user.role === "Claimant" && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
            New Claim
          </Button>
        )}
      </Box>

      {error && <Alert severity="error">{error}</Alert>}

      {loading ? <CircularProgress /> : (

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>

          <GridSection title="Pending Claims" data={submitted} />
          <GridSection title="Approved Claims" data={approved} />
          <GridSection title="Rejected Claims" data={rejected} />

        </Box>

      )}

      {/* CREATE CLAIM */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
        <DialogTitle>Create Claim</DialogTitle>

        <DialogContent>

          <FormControl fullWidth margin="normal">
            <InputLabel>Item</InputLabel>
            <Select
              value={formData.itemId}
              onChange={(e)=>setFormData({...formData, itemId:e.target.value})}
            >
              {items
                .filter(i => i.status === "AVAILABLE" && i.reporter?.id !== user.id)
                .map(i => (
                  <MenuItem key={i.id} value={i.id}>
                    {i.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Proof Description"
            value={formData.proofDescription}
            onChange={(e)=>setFormData({...formData, proofDescription:e.target.value})}
            margin="normal"
          />

          {/* IMAGE */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.onloadend = () => {
                setFormData({...formData, proofImage: reader.result});
              };
              if (file) reader.readAsDataURL(file);
            }}
          />

        </DialogContent>

        <DialogActions>
          <Button onClick={()=>setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Submit
          </Button>
        </DialogActions>

      </Dialog>

    </Box>
  );
};

export default ClaimsPage;
