import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { Box, Paper, Typography, Button } from '@mui/material';
import RestaurantList from '../components/RestaurantList';
import Wheel from '../components/Wheel';

export default function WheelPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [enabledIds, setEnabledIds] = useState([]);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  useEffect(() => {
    fetch('/resto.xlsx')
      .then((r) => r.arrayBuffer())
      .then((buffer) => {
        const wb = XLSX.read(buffer, { type: 'array' });
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(sheet);
        const withId = data.map((item, idx) => ({ id: idx, ...item }));
        setRestaurants(withId);
        setEnabledIds(withId.map((r) => r.id));
      })
      .catch(console.error);
  }, []);

  const toggle = (id) =>
    setEnabledIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const activeItems = restaurants.filter((r) => enabledIds.includes(r.id));

  const segments = activeItems.map((r) => ({
    name: r.nom,
    image: r.image,
    lat: r.lat,
    lon: r.lon,
  }));

  const handleSpinClick = () => {
    const winnerIndex = Math.floor(Math.random() * segments.length);
    setPrizeNumber(winnerIndex);
    setMustSpin(true);
  };

  return (
    <Box sx={{ mt: 1, height: '88vh', display: 'grid', gridTemplateColumns: '250px 1fr', gap: 1 }}>
      {/* Sidebar Controls */}
      <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <RestaurantList restaurants={restaurants} enabledIds={enabledIds} onToggle={toggle} />
        {segments.length > 0 ? (
          <Button variant="contained" color="primary" onClick={handleSpinClick} fullWidth sx={{ mt: 2 }}>
            Tourner
          </Button>
        ) : (
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
            Activez au moins un resto
          </Typography>
        )}
      </Paper>

      {/* Wheel Display */}
      <Paper
        elevation={3}
        sx={{
          p: 2,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {segments.length > 0 ? (
          <Wheel
            segments={segments}
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            onStopSpinning={() => setMustSpin(false)}
          />
        ) : (
          <Typography variant="body1" color="text.secondary">
            La roue apparaîtra ici
          </Typography>
        )}
      </Paper>
    </Box>
  );
}
