import { Link as MuiLink, SxProps } from '@mui/material';
import NextLink from 'next/link';
import { ReactElement, forwardRef } from 'react';

const LinkBehaviour = forwardRef(function LinkBehaviour(
  props,
  ref,
): JSX.Element {
  return <NextLink ref={ref} {...props} />;
});

/**
 * Link (MUI + Next)
 */
export default function LinkStyled({
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
    // <NextLink href={href} target={target} passHref>
    <MuiLink
      sx={sx}
      title={title}
      href={href}
      target={target}
      component={LinkBehaviour}
    >
      {children}
    </MuiLink>
    // </NextLink>
  );
}
