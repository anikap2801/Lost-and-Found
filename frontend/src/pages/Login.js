import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import axios from 'axios';

const Login = ({ goToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('REPORTER');

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8080/auth/login?email=${email}&password=${password}`
      );

      const user = res.data; //this is the real user

      localStorage.setItem("user", JSON.stringify({
        id: user.id,
        email: user.email,
        role: user.role   //comes from getRole()
      }));

      window.location.reload();
    } catch (err) {
      alert("Login failed");
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Paper sx={{ p: 4, width: 350 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
          Login
        </Typography>

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

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>

        <Button
          fullWidth
          sx={{ mt: 1 }}
          onClick={goToRegister}
        >
          Create account
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
