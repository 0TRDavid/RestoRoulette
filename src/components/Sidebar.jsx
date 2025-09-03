import * as React from 'react';
import { Box, Drawer, IconButton, Divider, Typography, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 240 }} role="presentation" onClick={toggleDrawer(false)}>
      
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', px: 2, py: 0.75, bgcolor: 'primary.main', color: 'common.white', width: '100%', }}>
        <IconButton
          size="large"
          edge="start"
          sx={{ color: 'common.white' }}
          aria-label="logo"
        >
          <RestaurantMenuIcon sx={{ fontSize: '2rem' }} />
        </IconButton>

        <Typography variant="h6" color="inherit" sx={{ whiteSpace: 'nowrap' }}>
          RestoRoulette
        </Typography>
      </Box>



      <Divider />

      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemText primary="Accueil" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/menu">
            <ListItemText primary="Menu" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/map">
            <ListItemText primary="Carte" />
          </ListItemButton>
        </ListItem>
      </List>

      <Box sx={{ mt: 'auto', p: 2 }}>
        <Divider sx={{ mb: 1 }} />
        <Typography variant="caption" color="text.secondary">
          © 2025 Service SI-Data LPA
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box>
      <IconButton color="inherit" onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </Box>
  );
}
