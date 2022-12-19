import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from 'components/utils/Link';
import * as React from 'react';

/**
 * Header Logo
 */
export default function HeaderLogo(): JSX.Element {
  return (
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
      <Link href="/">
        <Typography>{process.env.NEXT_PUBLIC_APP_NAME}</Typography>
      </Link>
      <Typography
        sx={{
          color: 'text.secondary',
          pl: 1,
        }}
      >
        {process.env.NEXT_PUBLIC_FEATURE_DEV && process.env.NEXT_PUBLIC_VERSION}
      </Typography>
    </Box>
  );
}
