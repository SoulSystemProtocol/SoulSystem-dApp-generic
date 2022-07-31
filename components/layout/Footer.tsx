import { Box, Container, Link as MuiLink, IconButton } from '@mui/material';
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
    <Container sx={{ mb: 1 }}>
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          pt: 2,
        }}
      >
        {icons.map(({ label, route, icon }: any) => (
          // eslint-disable-next-line react/jsx-key
          <Link key={route} href={route} passHref>
            <MuiLink
              underline="none"
              target="_blank"
              title={label}
              sx={{
                p: 0,
                mx: 1,
                color: '#fbfbfb',
                borderRadius: '50%',
                borderColor: '#fbfbfb',
                position: 'relative',
              }}
            >
              <IconButton aria-label="delete" sx={{ p: '0.5rem' }}>
                {icon}
              </IconButton>
            </MuiLink>
          </Link>
        ))}
      </Box>
    </Container>
  );
}
