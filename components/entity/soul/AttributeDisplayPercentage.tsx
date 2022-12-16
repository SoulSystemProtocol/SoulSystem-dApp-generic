import { Box, CircularProgress, Typography } from '@mui/material';
import { MetadataAttribute } from 'helpers/metadata';

/**
 * Display a percentage as a circular progress bar (Turbo)
 */
export default function AttributeDisplayPercentage({
  item,
}: {
  item: MetadataAttribute;
}): JSX.Element {
  // return <CircularProgress variant="determinate" value={item.value} />;
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" value={item.value} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(item.value)}%`}</Typography>
      </Box>
    </Box>
  );
}
