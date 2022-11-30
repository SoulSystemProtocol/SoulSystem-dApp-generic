import { Box, Typography } from '@mui/material';
import useWeb3NativeBalance from 'hooks/useWeb3NativeBalance';
import { taskStageToString } from 'utils/converters';

/**
 * Task Card Details
 */
export default function TaskCardDetails({ task, sx }: any): JSX.Element {
  const { balance: fund } = useWeb3NativeBalance(task?.id);
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
        variant="body2"
        color="text.secondary"
        sx={{ textTransform: 'capitalize' }}
      >
        {fund} {process.env.NEXT_PUBLIC_NETWORK_CURRENCY_NAME}
      </Typography>
    </Box>
  );
}
