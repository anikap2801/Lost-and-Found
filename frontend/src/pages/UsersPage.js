import React, { useState, useEffect } from 'react';
import {
  Box, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField,
  CircularProgress, Alert, Chip,
  Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { usersAPI } from '../services/api';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // ✅ RENAMED to avoid shadowing
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'REPORTER',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await usersAPI.getAll();
      setUsers(res.data || []);
      setError(null);
    } catch (err) {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await usersAPI.create(formData);
      await fetchUsers();
      setOpenDialog(false);
    } catch (err) {
      setError('Failed to create user');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete user?")) return;

    try {
      await usersAPI.delete(id);
      fetchUsers();
    } catch {
      setError("Delete failed");
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <h2>Users</h2>

        {/* ✅ Only moderator can add users */}
        {currentUser.role === "Moderator" && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
            Add User
          </Button>
        )}
      </Box>

      {error && <Alert severity="error">{error}</Alert>}

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>

                {/* ✅ Show actions column only for moderator */}
                {currentUser.role === "Moderator" && (
                  <TableCell>Actions</TableCell>
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>{u.id}</TableCell>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>
                    <Chip label={u.role} />
                  </TableCell>

                  {/* ✅ Only moderator can delete */}
                  {currentUser.role === "Moderator" && (
                    <TableCell>
                      <Button
                        color="error"
                        onClick={() => handleDelete(u.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </TableContainer>
      )}

      {/* Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add User</DialogTitle>

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
            label="Email"
            value={formData.email}
            onChange={(e)=>setFormData({...formData, email:e.target.value})}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e)=>setFormData({...formData, password:e.target.value})}
            margin="normal"
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              value={formData.userType}
              onChange={(e)=>setFormData({...formData, userType:e.target.value})}
            >
              <MenuItem value="REPORTER">Reporter</MenuItem>
              <MenuItem value="CLAIMANT">Claimant</MenuItem>
              <MenuItem value="MODERATOR">Moderator</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={()=>setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UsersPage;
