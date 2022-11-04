import { Link as MuiLink } from '@mui/material';
import NextLink from 'next/link';

/**
 * Component: Link (MUI + Next)
 */
export default function Link({
  children,
  href,
  target,
  sx = {},
}: any): JSX.Element {
  return (
    <NextLink href={href} passHref>
      <MuiLink underline="none" target={target} sx={sx}>
        {children}
      </MuiLink>
    </NextLink>
  );
}
