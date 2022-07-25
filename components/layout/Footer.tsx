import { Box, Container, Link as MuiLink } from '@mui/material';
import Link from 'next/link';

interface FooterProps {
  links: any;
  icons: any;
}

/**
 * Page Footer Component
 */
export default function Footer({ links, icons }: FooterProps): JSX.Element {
  return (
    <Container>
      {/* <Typography variant="h6" align="center" gutterBottom>
        Footer
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
      >
      </Typography> */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {icons.map(({ label, route, icon }: any) => (
          // eslint-disable-next-line react/jsx-key
          <Link href={route} passHref>
            <MuiLink underline="none" target="_blank" title={label}>
              {icon}
            </MuiLink>
          </Link>
        ))}
      </Box>
    </Container>
  );
}
