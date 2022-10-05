import { Box, Skeleton, Stack, Typography } from '@mui/material';
import RuleCard from './RuleCard';

/**
 * A component with a list of laws.
 */
export default function RuleList({
  laws,
  isCollapseEnabled,
  isCommentsEnabled,
  sx,
}: any): JSX.Element {
  return (
    <Stack spacing={4} sx={{ ...sx }}>
      {!laws && (
        <Box>
          <Skeleton
            variant="rectangular"
            sx={{ mb: 1 }}
            width={196}
            height={24}
          />
          <Skeleton variant="rectangular" width={82} height={24} />
        </Box>
      )}
      {laws && laws.size === 0 && <Typography>No Rules Found</Typography>}
      {laws && laws.size > 0 && (
        <>
          {[...laws.keys()].map((key) => (
            <RuleCard
              key={key}
              law={laws.get(key)}
              isCollapseEnabled={isCollapseEnabled}
              isCommentsEnabled={isCommentsEnabled}
            />
          ))}
        </>
      )}
    </Stack>
  );
}
