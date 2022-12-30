import { PROC_STAGE } from 'constants/entities';
import { Typography } from '@mui/material';

/**
 * Display Process Stage
 */
export default function StageDisplay({ proc }: { proc: any }): JSX.Element {
  return <Typography variant="caption">{PROC_STAGE[proc.stage]}</Typography>;
}
