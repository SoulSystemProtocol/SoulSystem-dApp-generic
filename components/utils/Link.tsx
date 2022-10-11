import { Link as MuiLink } from '@mui/material';
import Link from 'next/link';

/**
 * Component: Link (MUI + Next)
 */
export default function LinkMN({
  children,
  href,
  sx = { color: '#f8f8f8' },
}: any): JSX.Element {
  return (
    <Link href={href} passHref>
      <MuiLink underline="none" sx={sx}>
        {children}
      </MuiLink>
    </Link>
  );
}
