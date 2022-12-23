import { Box, IconButton, Link, Tooltip, Typography } from '@mui/material';
import { addressToShortAddress } from 'utils/converters';
import { CopyIcon } from 'components/icons';
import { Web3Context } from 'contexts/Web3Context';
import useToast from 'hooks/useToast';
import { useContext } from 'react';

/**
 * A component for Address Hash Display
 */
export default function AddressHash({
  address,
  displayLink = false,
  sx = {},
}: any): JSX.Element {
  const { curChainData } = useContext(Web3Context);
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
          {displayLink && <> </>}
        </IconButton>
      </Tooltip>
    </Box>
  );
}
