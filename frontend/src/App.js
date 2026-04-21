import React, { useState } from 'react';
import {
  Container,
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Badge,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './App.css';
import Dashboard from './pages/Dashboard';
import ItemsPage from './pages/ItemsPage';
import ClaimsPage from './pages/ClaimsPage';
import UsersPage from './pages/UsersPage';
import Login from './pages/Login';
import Register from './pages/Register';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3',
      dark: '#1976D2',
    },
    secondary: {
      main: '#FF6F00',
      dark: '#E65100',
    },
    background: {
      default: '#F5F5F5',
    },
    success: {
      main: '#4CAF50',
    },
    warning: {
      main: '#FF9800',
    },
    error: {
      main: '#F44336',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
  },
});

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notifications, setNotifications] = useState(0);
  const [authPage, setAuthPage] = useState('login');
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  if (!user) {
    return authPage === 'login'
      ? <Login goToRegister={() => setAuthPage('register')} />
      : <Register goToLogin={() => setAuthPage('login')} />;
  }

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <HomeIcon /> },
    { id: 'items', label: 'Items', icon: <InventoryIcon /> },
    { id: 'claims', label: 'Claims', icon: <AssignmentIcon /> },
    { id: 'users', label: 'Users', icon: <PeopleIcon /> },
  ];

  const handleNavigation = (pageId) => {
    setCurrentPage(pageId);
    setDrawerOpen(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'items':
        return <ItemsPage />;
      case 'claims':
        return <ClaimsPage />;
      case 'users':
        return <UsersPage />;
      case 'dashboard':
      default:
        return <Dashboard />;
    }
  };

  const drawerContent = (
    <Box sx={{ width: 280 }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Lost & Found
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.id}
            onClick={() => handleNavigation(item.id)}
            selected={currentPage === item.id}
            sx={{
              backgroundColor:
                currentPage === item.id ? 'primary.light' : 'transparent',
              color: currentPage === item.id ? 'primary.main' : 'inherit',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
        {/* App Bar */}
        <AppBar position="sticky" elevation={2}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
              edge="start"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              sx={{ flexGrow: 1, fontWeight: 'bold' }}
            >
              Lost & Found Management System
            </Typography>
            <Typography sx={{ mr: 2 }}>
              {user.email} ({user.role})
            </Typography>
            <Button
              color="inherit"
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
            >
              Logout
            </Button>
            <IconButton color="inherit" sx={{ mr: 1 }}>
              <Badge badgeContent={notifications} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Drawer */}
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          {drawerContent}
        </Drawer>

        {/* Main Content */}
        <Box sx={{ flexGrow: 1, p: 3, backgroundColor: 'background.default' }}>
          <Container maxWidth="lg">
            {renderPage()}
          </Container>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            p: 2,
            textAlign: 'center',
            mt: 4,
          }}
        >
          <Typography variant="body2">
            © 2026 PESU Lost & Found - CS073 CS078 CS080
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
