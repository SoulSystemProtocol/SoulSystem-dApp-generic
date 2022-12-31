import { Box, Typography, Stack, Grid } from '@mui/material';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
import { useState } from 'react';

/**
 * Deploy ERC Page
 */
export default function Deploy({ sx }: any): JSX.Element {
  const [type, setType] = useState(null);

  const sxBox = {
    textAlign: 'center',
    border: '1px solid darkgray',
    flex: 1,
    py: 5,
    borderRadius: 3,
  };

  // const typeSelect = () => { }

  return (
    <Box>
      <Typography variant="h1" gutterBottom>
        [WIP] Safe NFT
      </Typography>
      <Typography variant="subtitle1">Deploy a SafeNFT contract</Typography>
      <Typography variant="h2">Choose Type</Typography>
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Box sx={sxBox}>
          <SquareRoundedIcon fontSize="large" sx={{ mt: 3, mb: 2 }} />
          <Typography variant="h6">Single</Typography>
          <Typography variant="subtitle1">
            One of a kind unique items
          </Typography>
        </Box>
        <Box sx={sxBox}>
          <AutoAwesomeMotionIcon fontSize="large" sx={{ mt: 3, mb: 2 }} />
          <Typography variant="h6">Multi</Typography>
          <Typography variant="subtitle1">Series of identical items</Typography>
        </Box>
      </Stack>
    </Box>
  );
}
