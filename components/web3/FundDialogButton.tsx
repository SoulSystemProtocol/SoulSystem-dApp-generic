import { SxProps } from '@mui/material';
import { DialogContext, TDialogContext } from 'contexts/dialog';
import { useContext } from 'react';
import FundDialog from 'components/entity/task/FundDialog';
import ConditionalButton from 'components/layout/ConditionalButton';

/**
 * A component Fund Dialog Button
 */
export default function FundDialogButton({
  address,
  text = 'Fund Entity',
  sx = {},
}: {
  address: string;
  text: string;
  sx?: SxProps;
}): JSX.Element {
  const { showDialog, closeDialog }: Partial<TDialogContext> =
    useContext(DialogContext);
  return (
    <ConditionalButton
      size="small"
      variant="outlined"
      sx={sx}
      onClick={() =>
        showDialog?.(
          <FundDialog address={address} title={text} onClose={closeDialog} />,
        )
      }
    >
      {text}
    </ConditionalButton>
  );
}
