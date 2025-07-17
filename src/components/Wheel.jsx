import { Box } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Wheel } from 'react-custom-roulette';

export default function WheelComponent({
  segments,
  mustStartSpinning,
  prizeNumber,
  onStopSpinning,
}) {
  const data = segments.map((restaurant) => ({
    option: restaurant.name,
  }));

  // Palette sobre et moderne MUI (alternance)
  const backgroundColors = segments.map((_, i) =>
    i % 2 ? '#F5F5F5' : '#1976D2'
  );

  return (
    <Box position="relative" display="flex" justifyContent="center" alignItems="center">
      <Wheel
        mustStartSpinning={mustStartSpinning}
        prizeNumber={prizeNumber}
        data={data}
        backgroundColors={backgroundColors}
        textColors={['#37474F']}
        onStopSpinning={onStopSpinning}
        outerBorderColor="#1976D2"
        outerBorderWidth={2}
        innerBorderColor="#F5F5F5"
        innerBorderWidth={1}
        radiusLineColor="#E0E0E0"
        radiusLineWidth={1}
        fontSize={15}
        spinDuration={0.8}
        style={{ width: '100%', height: '100%' }}
      />
      <ArrowDropDownIcon
        sx={{
          position: 'absolute',
          top: '-12px',
          fontSize: 40,
          color: '#1976D2',
        }}
      />
    </Box>
  );
}
