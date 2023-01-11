import { Box, Typography } from '@mui/material';
import ImageBox from 'components/utils/ImageBox';
import FaucetCallout from 'components/web3/FaucetCallout';

/**
 * RoyVerse Landing Page
 */
export default function RoyVerse(): JSX.Element {
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
          sx={{ fontSize: { xs: '1.2rem', sm: '1.8rem' } }}
          letterSpacing="0.02em"
        >
          Automated collaborative bounties
        </Typography>
        <FaucetCallout minBalance={0.1} />
      </Box>

      <Box>RoyHacks Text...</Box>
    </>
  );
}
