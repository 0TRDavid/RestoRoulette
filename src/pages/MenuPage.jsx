import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { Box, Grid, Paper, Typography, List, ListItem, ListItemButton, ListItemText, Divider, Link } from '@mui/material';

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
        setSelectedResto(withId[0]); // sélectionne le 1er par défaut
      })
      .catch(console.error);
  }, []);

  return (
    <Grid container spacing={1} sx={{ mt: 0.1 }}>
      {/* Sidebar à gauche */}
      <Grid item xs={3}>
        <Paper elevation={3} sx={{ height: '100%', overflowY: 'auto', p: 2 }}>
          <Typography variant="h5"> Restaurants </Typography>

          <Divider sx={{ my: 4, width: '100%', mb: 1, mt: 1 }} />
          
          <List>
            {restaurants.map((r) => (
              <ListItem disablePadding key={r.id}>
                <ListItemButton onClick={() => setSelectedResto(r)}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <img src={r.image} alt={r.nom} style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4 }}/>
                    <ListItemText primary={r.nom} />
                  </Box>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        
        </Paper>
      </Grid>

      {/* Contenu à droite */}
      <Grid item xs={9}>
        <Paper elevation={3} sx={{ height: '100%', p: 2, display: 'flex', flexDirection: 'column'}}>
          {selectedResto && (
            <>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 0.1 }}>
                    <Typography variant="h5"> {selectedResto.nom} </Typography>
                    <Link href={selectedResto.menu} target="_blank" rel="noopener noreferrer" underline="hover"> Voir le menu en ligne </Link>
                </Box>
                            
                <Divider sx={{ my: 4, width: '100%', mb: 1, mt: 1 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', mt: 4 }}>
                    <img
                        src={`/menu/${selectedResto.menu_image}`}
                        alt={`Menu de ${selectedResto.nom}`}
                        style={{
                        maxWidth: '90%',
                        }}
                    />
                </Box>
            </>
          )}
        </Paper>
      </Grid>
    
    </Grid>
  );
}
