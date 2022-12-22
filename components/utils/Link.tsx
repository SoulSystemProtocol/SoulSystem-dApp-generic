import { Link as MuiLink, SxProps } from '@mui/material';
import NextLink from 'next/link';
import { ReactElement } from 'react';

/**
 * Link (MUI + Next)
 */
export default function Link({
  children,
  href,
  target,
  title,
  sx = {},
}: {
  children: string | ReactElement | ReactElement[];
  href: string;
  target?: string;
  title?: string;
  sx?: SxProps;
}): JSX.Element {
  return (
    <NextLink href={href} passHref>
      <MuiLink target={target} sx={sx} title={title}>
        {children}
      </MuiLink>
    </NextLink>
  );
}
