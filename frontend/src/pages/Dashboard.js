import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import { itemsAPI, claimsAPI, usersAPI } from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    items: 0,
    claims: 0,
    users: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [itemsRes, claimsRes, usersRes] = await Promise.all([
          itemsAPI.getAll(),
          claimsAPI.getAll(),
          usersAPI.getAll(),
        ]);

        setStats({
          items: itemsRes.data.length || 0,
          claims: claimsRes.data.length || 0,
          users: usersRes.data.length || 0,
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError('Failed to load dashboard statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ title, count, icon: Icon, color }) => (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography color="textSecondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color }}>
              {count}
            </Typography>
          </Box>
          <Icon sx={{ fontSize: 48, color: color, opacity: 0.5 }} />
        </Box>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        Dashboard
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Items"
            count={stats.items}
            icon={InventoryIcon}
            color="#2196F3"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Claims"
            count={stats.claims}
            icon={AssignmentIcon}
            color="#FF9800"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Users"
            count={stats.users}
            icon={PeopleIcon}
            color="#4CAF50"
          />
        </Grid>
      </Grid>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Welcome to Lost & Found System
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Use the navigation menu to manage items, claims, and users. Each section
            provides comprehensive management tools for efficient operation of the
            lost and found system.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;
