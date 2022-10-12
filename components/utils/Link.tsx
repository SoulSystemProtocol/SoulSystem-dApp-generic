import { Link as MuiLink } from '@mui/material';
import NextLink from 'next/link';

/**
 * Component: Link (MUI + Next)
 */
export default function Link({
  children,
  href,
  sx = { color: '#f8f8f8' },
}: any): JSX.Element {
  return (
    <NextLink href={href} passHref>
      <MuiLink underline="none" sx={sx}>
        {children}
      </MuiLink>
    </NextLink>
  );
}
