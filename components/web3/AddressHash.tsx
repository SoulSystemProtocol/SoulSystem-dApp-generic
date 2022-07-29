import { Box, IconButton, Link, Tooltip, Typography } from '@mui/material';
import { addressToShortAddress } from 'utils/converters';
import { CopyIcon } from 'components/icons';
import useToast from 'hooks/useToast';

export default function AddressHash({
  address,
  sx = {},
}: {
  address: string;
  sx: {};
}): JSX.Element {
  const { showToastSuccess } = useToast();

  if (!address) return <></>;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        ...sx,
      }}
    >
      {addressToShortAddress(address)}
      <Tooltip title={'Copy address'}>
        <IconButton
          color="primary"
          aria-label={'Copy address'}
          sx={{ p: '3px' }}
          onClick={() => {
            navigator.clipboard.writeText(address);
            showToastSuccess('Address saved to clipboard');
          }}
        >
          <CopyIcon stroke={'#e8e8e8'} />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
