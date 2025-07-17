// src/pages/WheelPage.jsx
import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import RestaurantList from '../components/RestaurantList'
import Wheel from '../components/Wheel'

export default function WheelPage() {
  const [restaurants, setRestaurants] = useState([])
  const [enabledIds, setEnabledIds] = useState([])
  const [mustSpin, setMustSpin] = useState(false)
  const [prizeNumber, setPrizeNumber] = useState(0)

  useEffect(() => {
    fetch('/resto.xlsx')
      .then((r) => r.arrayBuffer())
      .then((buffer) => {
        const wb = XLSX.read(buffer, { type: 'array' })
        const sheet = wb.Sheets[wb.SheetNames[0]]
        const data = XLSX.utils.sheet_to_json(sheet)
        const withId = data.map((item, idx) => ({ id: idx, ...item }))
        setRestaurants(withId)
        setEnabledIds(withId.map((r) => r.id))
      })
      .catch(console.error)
  }, [])

  const toggle = (id) =>
    setEnabledIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )

  const activeItems = restaurants.filter((r) =>
    enabledIds.includes(r.id)
  )

  const segments = activeItems.map((r) => ({
    name: r.nom,
    image: r.image,
    lat: r.lat, 
    lon: r.lon,
  }));

  const handleSpinClick = () => {
    const winnerIndex = Math.floor(Math.random() * segments.length)
    setPrizeNumber(winnerIndex)
    setMustSpin(true)
  }

  return (
    <Box sx={{mt: 1}}>
      <Grid container sx={{ height: '87vh' }} spacing={1}>
        
        {/* Sidebar Controls */}
        <Grid item xs={12} md={2}>
          <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%'}}>
            <RestaurantList restaurants={restaurants} enabledIds={enabledIds} onToggle={toggle}/>

            {segments.length > 0 ? (
              <Button variant="contained" color="primary" onClick={handleSpinClick} fullWidth sx={{top: '20px'}}> Tourner </Button>
            ) : (
              <Typography variant="body2" color="text.secondary" align="center">
                Activez au moins un resto
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Wheel Display */}
        <Grid item xs={12} md={10}>
          <Paper elevation={3} sx={{p: 2,height: '100%',display: 'flex',alignItems: 'center',justifyContent: 'center',}}>
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
        </Grid>
      </Grid>
    </Box>
  )
}
