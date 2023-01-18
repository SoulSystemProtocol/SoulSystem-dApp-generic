import { SxProps } from '@mui/material';
import { DialogContext, TDialogContext } from 'contexts/dialog';
import { useContext } from 'react';
import FundDialog from 'components/entity/task/FundDialog';
import TooltipButton from 'components/layout/TooltipButton';

/**
 * A component Fund Dialog Button
 */
export default function FundDialogButton({
  address,
  text = 'Fund Entity',
  disabled,
  sx = {},
}: {
  address: string;
  text: string;
  disabled?: boolean;
  sx?: SxProps;
}): JSX.Element {
  const { showDialog, closeDialog }: Partial<TDialogContext> =
    useContext(DialogContext);
  return (
    <TooltipButton
      size="small"
      variant="outlined"
      sx={sx}
      disabled={disabled}
      tooltip="Transfer funds"
      onClick={() =>
        showDialog?.(
          <FundDialog address={address} title={text} onClose={closeDialog} />,
        )
      }
    >
      {text}
    </TooltipButton>
  );
}
