import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const Register = ({ goToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('REPORTER');

  const handleRegister = async () => {
    try {
      await axios.post(
        `http://localhost:8080/auth/register?name=${name}&email=${email}&password=${password}&userType=${userType}`
      );

      alert("Registered successfully. Please login.");
      goToLogin();
    } catch (err) {
      alert("Registration failed");
      console.error(err);
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
      <Paper sx={{ p: 4, width: 350 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
          Register
        </Typography>

        <TextField
          fullWidth
          label="Name"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Select
          fullWidth
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          sx={{ mt: 2 }}
        >
          <MenuItem value="REPORTER">Reporter</MenuItem>
          <MenuItem value="CLAIMANT">Claimant</MenuItem>
          <MenuItem value="MODERATOR">Moderator</MenuItem>
        </Select>

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
          onClick={handleRegister}
        >
          Register
        </Button>

        <Button
          fullWidth
          sx={{ mt: 1 }}
          onClick={goToLogin}
        >
          Back to Login
        </Button>
      </Paper>
    </Box>
  );
};

export default Register;
