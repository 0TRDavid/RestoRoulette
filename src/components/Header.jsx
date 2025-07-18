import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import Box from '@mui/material/Box';
import Sidebar from './Sidebar';

export default function HeaderBar() {
  return (
    <Box>
      <AppBar position="static" color="primary" elevation={3}>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '97.3%',
            paddingLeft: '0px',
            paddingRight: '0px'
          }}
        >
          {/* À gauche : le logo et le titre */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Sidebar />
            <IconButton size="large" edge="start" color="inherit" aria-label="logo">
              <RestaurantMenuIcon sx={{ fontSize: '2.8rem' }} />
            </IconButton>

            <Typography
              variant="h6"
              sx={{
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 700,
                fontSize: '2rem',
                color: 'white',
              }}
            >
              RestoRoulette
            </Typography>
          </Box>

          {/* À droite : la phrase + la roue */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1}}>
            <Typography
              variant="body1"
              sx={{
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 400,
                fontSize: '1.1rem',
                color: 'white',
                whiteSpace: 'nowrap',
              }}
            >
              Marre de choisir un resto ? Faites tourner la roue
            </Typography>

            <Box
              component="img"
              src="/icons/wheel.svg"
              alt="Wheel spinning"
              sx={{
                width: 40,
                height: 40,
                animation: 'spin 10s linear infinite',
                '@keyframes spin': {
                  '0%': { transform: 'rotate(0deg)' },
                  '100%': { transform: 'rotate(360deg)' },
                },
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>

    </Box>
  );
}
