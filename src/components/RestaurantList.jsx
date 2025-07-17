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
        {restaurants.map((r) => (
          <Box
            key={r.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 1,
              gap: 2,
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
      </FormGroup>
    </>
  );
}
