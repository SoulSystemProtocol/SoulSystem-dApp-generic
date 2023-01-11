import { Box, Typography } from '@mui/material';
import NativeBalanceDisplay from 'components/web3/NativeBalanceDisplay';
import { taskStageToString } from 'utils/converters';

/**
 * Task Card - Additional Details
 * TODO: Add Whitelisted ERC20 Tokens
 */
export default function TaskCardDetails({ task }: { task: any }): JSX.Element {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ textTransform: 'capitalize' }}
      >
        {task && taskStageToString(task)}
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ whiteSpace: 'nowrap' }}
      >
        <NativeBalanceDisplay address={task?.id} />
      </Typography>
    </Box>
  );
}
