// import { useContext, useEffect, useState } from 'react';
// import { Button, Stack } from '@mui/material';
// import { GAME_ROLE } from 'constants/contracts';
// import { DataContext } from 'contexts/data';
// import { DialogContext } from 'contexts/dialog';
// import useError from 'hooks/useError';
// import useToast from 'hooks/useToast';

import { Box, Typography, Stack, Grid } from '@mui/material';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
import { useState } from 'react';

/**
 * Deploy ERC Page
 */
export default function Deploy({ sx }: any) {
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
      <Typography variant="h1">
        Choose Type    
      </Typography>
      <Typography variant="subtitle1">Which kind of a SafeNFT contract do you with to deploy?</Typography>
      
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>

        <Box sx={sxBox}>
        <SquareRoundedIcon fontSize="large" sx={{ mt:3, mb:2 }} />
          <Typography variant="h6">Single</Typography>
          <Typography variant="subtitle1">One of a kind unique items</Typography>
        </Box>

        <Box sx={sxBox}>
          <AutoAwesomeMotionIcon fontSize="large" sx={{ mt:3, mb:2 }} />
          <Typography variant="h6">Multi</Typography>
          <Typography variant="subtitle1">Series of identical items</Typography>
        </Box>

      </Stack>
    </Box>
  );
}
