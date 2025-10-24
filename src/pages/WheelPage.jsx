import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { Box, Paper, Typography, Button } from '@mui/material';
import RestaurantList from '../components/RestaurantList';
import Wheel from '../components/Wheel';
import Credit from '../components/credit';
import '../assets/WheelPage.css'; // 🔹 Import du CSS

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
    <Box className="wheelpage-container">
      {/* Sidebar Controls */}
      <Paper elevation={3} className="sidebar-paper">
        <RestaurantList
          restaurants={restaurants}
          enabledIds={enabledIds}
          onToggle={toggle}
        />
        {segments.length > 0 ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSpinClick}
            fullWidth
            className="spin-button"
          >
            Tourner
          </Button>
        ) : (
          <Typography
            variant="body2"
            color="text.secondary"
            className="no-resto-text"
          >
            Activez au moins un resto
          </Typography>
        )}
      </Paper>

      {/* Wheel Display */}
      <Paper elevation={3} className="wheel-paper">
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

      <Credit text={"Idée d'Hugo et conçu par David"} />
    </Box>
  );
}
