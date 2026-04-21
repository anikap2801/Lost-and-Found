import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
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
  Typography
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { itemsAPI, usersAPI, claimsAPI } from '../services/api';

const ItemsPage = () => {
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [openClaimDialog, setOpenClaimDialog] = useState(false);
  const [claimItemId, setClaimItemId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    reporterId: '',
    image: ''
  });

  const [claimData, setClaimData] = useState({
    proofDescription: '',
    proofImage: ''
  });

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchItems();
    fetchUsers();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await itemsAPI.getAll();
      setItems(res.data || []);
      setError(null);
    } catch {
      setError('Failed to load items');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await usersAPI.getAll();
      setUsers(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenDialog = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setFormData({
        name: item.name,
        description: item.description,
        location: item.location,
        reporterId: item.reporter?.id,
        image: item.image || ''
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        description: '',
        location: '',
        reporterId: '',
        image: ''
      });
    }
    setOpenDialog(true);
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await itemsAPI.update(editingId, formData);
      } else {
        await itemsAPI.create({
          ...formData,
          reporter: { id: user.id }
        });
      }

      fetchItems();
      setOpenDialog(false);
    } catch {
      setError('Failed to save item');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;

    try {
      await itemsAPI.delete(id);
      fetchItems();
    } catch {
      setError('Delete failed');
    }
  };

  const handleOpenClaimDialog = (itemId) => {
    setClaimItemId(itemId);
    setClaimData({
      proofDescription: '',
      proofImage: ''
    });
    setOpenClaimDialog(true);
  };

  const handleSubmitClaim = async () => {
    try {
      await claimsAPI.create({
        item: { id: claimItemId },
        claimant: { id: user.id },
        proofDescription: claimData.proofDescription,
        proofImage: claimData.proofImage
      });

      setOpenClaimDialog(false);
      fetchItems();
    } catch {
      setError("Claim failed");
    }
  };

  const getStatusColor = (status) => {
    return status === "AVAILABLE" ? "success" : "warning";
  };

  return (
    <Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Items</Typography>

        {user.role === "Reporter" && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Add Item
          </Button>
        )}
      </Box>

      {error && <Alert severity="error">{error}</Alert>}

      {loading ? <CircularProgress /> : (
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 3
        }}>
          {items.map(item => (
            <Paper key={item.id} sx={{ p: 2 }}>

              <Box
                component="img"
                src={item.image || ""}
                sx={{
                  width: '100%',
                  height: 180,
                  objectFit: 'cover',
                  backgroundColor: '#ddd'
                }}
              />

              <Typography variant="h6">{item.name}</Typography>
              <Typography>{item.description}</Typography>
              <Typography>📍 {item.location}</Typography>

              <Typography variant="caption">
                👤 {item.reporter?.name}
              </Typography>

              <Chip label={item.status} color={getStatusColor(item.status)} />

              {user.role === "Claimant" && item.status === "AVAILABLE" && (
                <Button
                  variant="contained"
                  size="small"
                  sx={{ mt: 1 }}
                  onClick={() => handleOpenClaimDialog(item.id)}
                >
                  Claim
                </Button>
              )}

              {((user.role === "Reporter" && item.reporter?.id === user.id) || user.role === "Moderator") && (
                <Box>
                  <IconButton onClick={() => handleOpenDialog(item)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              )}

            </Paper>
          ))}
        </Box>
      )}

      {/* ITEM DIALOG */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
        <DialogTitle>
          {editingId ? "Edit Item" : "Add Item"}
        </DialogTitle>

        <DialogContent>

          <TextField
            fullWidth
            label="Name"
            value={formData.name}
            onChange={(e)=>setFormData({...formData, name:e.target.value})}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Description"
            value={formData.description}
            onChange={(e)=>setFormData({...formData, description:e.target.value})}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Location"
            value={formData.location}
            onChange={(e)=>setFormData({...formData, location:e.target.value})}
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
                setFormData({
                  ...formData,
                  image: reader.result
                });
              };

              if (file) reader.readAsDataURL(file);
            }}
            style={{ marginTop: 15 }}
          />

        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* CLAIM DIALOG */}
      <Dialog open={openClaimDialog} onClose={() => setOpenClaimDialog(false)} fullWidth>
        <DialogTitle>Submit Claim</DialogTitle>

        <DialogContent>

          <TextField
            fullWidth
            label="Proof Description"
            value={claimData.proofDescription}
            onChange={(e)=>setClaimData({...claimData, proofDescription:e.target.value})}
            margin="normal"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              const reader = new FileReader();

              reader.onloadend = () => {
                setClaimData({
                  ...claimData,
                  proofImage: reader.result
                });
              };

              if (file) reader.readAsDataURL(file);
            }}
          />

        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenClaimDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmitClaim} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default ItemsPage;
