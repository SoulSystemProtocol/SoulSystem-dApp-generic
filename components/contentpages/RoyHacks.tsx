import { Box, Typography } from '@mui/material';
import ImageBox from 'components/utils/ImageBox';

/**
 * Home Page
 */
export default function RoyHacks() {
  return (
    <>
      <ImageBox
        src="/images/futuristic_tower1.jpg"
        sx={{
          height: { xs: '160px', md: '320px' },
        }}
      />
      <Box
        sx={{
          color: '#fff',
          textAlign: 'center',
          px: { xs: 2, md: 4 },
          pt: { xs: 2, md: 4 },
        }}
      >
        <Typography
          gutterBottom
          variant="h1"
          fontWeight={700}
          letterSpacing="0.1em"
          sx={{ fontSize: { sm: '5rem', xs: '3rem' } }}
        >
          RoyHacks
        </Typography>
        <Typography
          variant="h4"
          sx={{ fontSize: { xs: '1.2rem', sm: '2rem' } }}
          letterSpacing="0.05em"
        >
          Compose fully decentralized socio-economic systems with no code
        </Typography>
      </Box>

      <Box>RoyHacks Text...</Box>
    </>
  );
}
