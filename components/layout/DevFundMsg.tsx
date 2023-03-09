import { useTheme, Box, Typography } from '@mui/material';

/**
 * Development Environment Message
 */
export default function DevFundMsg(): JSX.Element {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{
          mt: 1,
          px: 2,
          background: `linear-gradient(${theme.palette.background.default}, ${theme.palette.background.default}) padding-box, linear-gradient(to right, darkblue, darkorchid) border-box`,
          borderRadius: '20px',
          border: '3px solid transparent',
          display: 'inline',
          padding: '4px 12px',
        }}
      >
        This is a development chain, make sure to settle payment on mainnet
        manually
      </Typography>
    </Box>
  );
}
