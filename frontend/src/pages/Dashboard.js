import React, { useState, useEffect } from 'react';
import {
  Box, Grid, Card, CardContent, Typography,
  CircularProgress, Alert
} from '@mui/material';

import InventoryIcon from '@mui/icons-material/Inventory';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';

import { itemsAPI, claimsAPI, usersAPI } from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);

      const itemsRes = await itemsAPI.getAll();
      const usersRes = await usersAPI.getAll();
      const claimsRes = await claimsAPI.getAll();

      const items = itemsRes.data || [];
      const users = usersRes.data || [];
      const claims = claimsRes.data || [];

      // 🔥 ROLE-BASED LOGIC
      let computedStats = {
        totalItems: items.length,
        totalUsers: users.length,
        pendingClaims: claims.filter(c => c.status === "SUBMITTED").length
      };

      if (user.role === "Claimant") {
        computedStats.myClaims = claims.filter(c => c.claimant?.id === user.id).length;
      }

      if (user.role === "Reporter") {
        computedStats.myItems = items.filter(i => i.reporter?.id === user.id).length;
        computedStats.claimsOnMyItems = claims.filter(c => c.item?.reporter?.id === user.id).length;
      }

      if (user.role === "Moderator") {
        computedStats.approved = claims.filter(c => c.status === "APPROVED").length;
        computedStats.rejected = claims.filter(c => c.status === "REJECTED").length;
      }

      setStats(computedStats);

    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, count, icon: Icon, color }) => (
    <Card sx={{
      transition: '0.3s',
      '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 }
    }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary">{title}</Typography>
            <Typography variant="h4" sx={{ color, fontWeight: 'bold' }}>
              {count}
            </Typography>
          </Box>
          <Icon sx={{ fontSize: 40, color, opacity: 0.5 }} />
        </Box>
      </CardContent>
    </Card>
  );

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>

        {/* COMMON */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Items" count={stats.totalItems} icon={InventoryIcon} color="#2196F3" />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Users" count={stats.totalUsers} icon={PeopleIcon} color="#4CAF50" />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Pending Claims" count={stats.pendingClaims} icon={AssignmentIcon} color="#FF9800" />
        </Grid>

        {/* CLAIMANT */}
        {user.role === "Claimant" && (
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="My Claims" count={stats.myClaims} icon={AssignmentIcon} color="#9C27B0" />
          </Grid>
        )}

        {/* REPORTER */}
        {user.role === "Reporter" && (
          <>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard title="My Items" count={stats.myItems} icon={InventoryIcon} color="#00BCD4" />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <StatCard title="Claims on My Items" count={stats.claimsOnMyItems} icon={AssignmentIcon} color="#E91E63" />
            </Grid>
          </>
        )}

        {/* MODERATOR */}
        {user.role === "Moderator" && (
          <>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard title="Approved Claims" count={stats.approved} icon={AssignmentIcon} color="#4CAF50" />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <StatCard title="Rejected Claims" count={stats.rejected} icon={AssignmentIcon} color="#F44336" />
            </Grid>
          </>
        )}

      </Grid>
    </Box>
  );
};

export default Dashboard;
