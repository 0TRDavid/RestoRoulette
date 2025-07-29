import React from 'react';
import { Box, Typography, FormGroup, Checkbox, Divider } from '@mui/material';

export default function RestaurantList({ restaurants, enabledIds, onToggle }) {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Restaurants
      </Typography>

      <Divider sx={{ my: 4, width: '100%', mb: 3, mt: 0 }} />

      <FormGroup>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr', // 2 colonnes
            gap: 2, // espace entre les colonnes et lignes
          }}
        >
          {restaurants.map((r) => (
            <Box
              key={r.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: 2,
              }}
            >
              <Checkbox
                checked={enabledIds.includes(r.id)}
                onChange={() => onToggle(r.id)}
              />
              <img
                src={r.image}
                alt={r.nom}
                style={{
                  width: 60,
                  height: 60,
                  objectFit: 'cover',
                  borderRadius: 4,
                }}
              />
              <Typography>{r.nom}</Typography>
            </Box>
          ))}
        </Box>
      </FormGroup>
    </>
  );
}
