import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, Typography } from '@mui/material';

// Fix icons Leaflet bug in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

export default function RestoMap({ segments }) {
  if (!segments.length) return null;

  const center = [45.76382825455149, 4.835479498460481];
  const siege = {name: "Siège LPA", lat: 45.76369966175163, lon: 4.837387529830456};


  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <MapContainer center={center} zoom={17} scrollWheelZoom style={{ width: '100%', height: '100%' }}>
        <TileLayer
          attribution=' &copy; OpenStreetMap contributors'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          minZoom={0}
          maxZoom={20}
        />
        {segments.map((resto, idx) => (
          <Marker key={idx} position={[resto.lat, resto.lon]}>
            <Popup>
              <Typography variant="subtitle1" fontWeight="bold">{resto.name}</Typography>
              <img src={resto.image} alt={resto.name} style={{ width: '300px', borderRadius: '4px', marginTop: '8px' }} />
            </Popup>
          </Marker>
        ))}

        <Marker position={[siege.lat, siege.lon]}>
          <Popup>
            <Typography variant="h6">{siege.name}</Typography>
            <img src={"https://lh3.googleusercontent.com/p/AF1QipPju8Lu0ooJ_GBIRrPjld672repVjcC4sgbRrIn=s1360-w1360-h1020"} style={{ width: '300px', borderRadius: '4px', marginTop: '8px' }} />
          </Popup>
        </Marker>

      </MapContainer>
    </Box>
  );
}
