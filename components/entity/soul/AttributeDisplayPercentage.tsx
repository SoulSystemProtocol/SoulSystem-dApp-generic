import { Box, Card, CircularProgress, Stack, Typography } from '@mui/material';
import { MetadataAttribute } from 'helpers/metadata';

/**
 * Display a percentage as a circular progress bar (Turbo)
 */
export default function AttributeDisplayPercentage({
  item,
}: {
  item: MetadataAttribute;
}): JSX.Element {
  if (!item) return <></>;
  return (
    <Card variant="outlined" sx={{ py: 1 }}>
      <Stack direction="column" sx={{ alignItems: 'center' }}>
        <Typography variant="subtitle1">{item.trait_type}</Typography>
        <Box>
          <Box
            sx={{ position: 'relative', display: 'inline-flex', flexGrow: 0 }}
          >
            <CircularProgress
              variant="determinate"
              thickness={6}
              size={60}
              value={Math.round(item.value)}
            />
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
        </Box>
      </Stack>
    </Card>
  );
}
