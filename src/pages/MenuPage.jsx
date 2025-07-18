import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Link,
} from '@mui/material';

export default function WheelPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedResto, setSelectedResto] = useState(null);

  useEffect(() => {
    fetch('/resto.xlsx')
      .then((r) => r.arrayBuffer())
      .then((buffer) => {
        const wb = XLSX.read(buffer, { type: 'array' });
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(sheet);
        const withId = data.map((item, idx) => ({ id: idx, ...item }));
        setRestaurants(withId);
        setSelectedResto(withId[0]);
      })
      .catch(console.error);
  }, []);

  return (
    <Box
      sx={{
        height: '93vh',
        display: 'grid',
        gridTemplateColumns: '250px 1fr',
        gap: 1,
        p: 2,
      }}
    >
      {/* Sidebar */}
      <Paper
        elevation={3}
        sx={{
          height: '100%',
          overflowY: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Restaurants
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <List>
          {restaurants.map((r) => (
            <ListItem disablePadding key={r.id}>
              <ListItemButton onClick={() => setSelectedResto(r)}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
                  <ListItemText primary={r.nom} />
                </Box>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Contenu à droite */}
      <Paper
        elevation={3}
        sx={{
          height: '100%',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >
        {selectedResto && (
          <>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="h5" sx={{ mb: 2 }}>{selectedResto.nom}</Typography>
              <Link
                href={selectedResto.menu}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
              >
                Voir le menu en ligne
              </Link>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <img
                src={`/menu/${selectedResto.menu_image}`}
                alt={`Menu de ${selectedResto.nom}`}
                style={{
                  maxWidth: '90%',
                  borderRadius: 8,
                }}
              />
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
}
