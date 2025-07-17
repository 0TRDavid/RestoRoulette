import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import Map from '../components/Map';
import { Box, Typography } from '@mui/material';

export default function MapPage() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch('/resto.xlsx')
      .then((r) => r.arrayBuffer())
      .then((buffer) => {
        const wb = XLSX.read(buffer, { type: 'array' });
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(sheet);
        const withId = data.map((item, idx) => ({ id: idx, ...item }));
        setRestaurants(withId);
      })
      .catch(console.error);
  }, []);

  const segments = restaurants.map((r) => ({
    name: r.nom,
    image: r.image,
    lat: r.lat,
    lon: r.lon,
  }));

  console.log(segments)
  return (
    <Box sx={{ width: '100%', height: '93vh' }}>
      {segments.length > 0 ? (
        <Map segments={segments} />
      ) : (
        <Typography sx={{ p: 4 }} align="center">
          Aucune donnée à afficher sur la carte.
        </Typography>
      )}
    </Box>
  );
}
