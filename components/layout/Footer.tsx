import { Box, Container, IconButton, Stack } from '@mui/material';
import Link from 'components/utils/Link';

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
      <Stack
        direction="row"
        sx={{
          justifyContent: 'space-evenly',
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          pt: 2,
        }}
      >
        {icons.map(({ label, route, icon }: any) => (
          // eslint-disable-next-line react/jsx-key
          <Link
            key={route}
            href={route}
            target="_blank"
            title={label}
            sx={{
              display: 'grid',
              p: 0,
              mx: 1,
              color: 'text.secondary',
              borderRadius: '50%',
              borderColor: '#fbfbfb',
              position: 'relative',
              underline: 'none',
            }}
          >
            <IconButton aria-label="delete" sx={{ p: '0.5rem' }}>
              {icon}
            </IconButton>
            {label}
          </Link>
        ))}
      </Stack>
    </Container>
  );
}
