import { Backdrop, CircularProgress } from '@mui/material';

/**
 * Component: a loading backdrop.
 */
export default function LoadingBackdrop() {
  return (
    <Backdrop
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: '#FFFFFF',
      }}
      open
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
