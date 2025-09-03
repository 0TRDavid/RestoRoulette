import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

export default function BottomRightNote() {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 1000,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 1.5,
          borderRadius: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.85)', // léger fond translucide
          backdropFilter: 'blur(6px)', // effet flou derrière
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          },
        }}
      >
        <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic', fontWeight: 500 }}>
          Pensé par Hugo et Réalisé par David
        </Typography>
      </Paper>
    </Box>
  );
}
