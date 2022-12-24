import {
  Box,
  IconButton,
  Link,
  Tooltip,
  Typography,
  SxProps,
} from '@mui/material';
import { addressToShortAddress } from 'utils/converters';
import { CopyIcon } from 'components/icons';
import LaunchIcon from '@mui/icons-material/Launch';

import ContentCopyIcon from '@mui/icons-material/ContentCopyRounded';
import { Web3Context } from 'contexts/Web3Context';
import useToast from 'hooks/useToast';
import { useContext } from 'react';

import { ChainData } from './chains/ChainsData';

/**
 * A component for Address Hash Display
 */
export default function AddressHash({
  address,
  displayLink = false,
  displayCopy = true,
  sx = {},
}: {
  address: string;
  displayLink?: boolean;
  displayCopy?: boolean;
  sx?: SxProps;
}): JSX.Element {
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
      {displayCopy && (
        <Tooltip title="Copy address">
          <IconButton
            color="primary"
            aria-label="Copy address"
            sx={{ p: '2px' }}
            onClick={() => {
              navigator.clipboard.writeText(address);
              showToastSuccess('Address saved to clipboard');
            }}
          >
            <CopyIcon
              stroke="#e8e8e8"
              style={{ height: '13px', marginBottom: '3px' }}
            />
          </IconButton>
        </Tooltip>
      )}
      {displayLink && (
        <Tooltip title="Block explorer">
          <Link
            target="_blank"
            href={`${curChainData.blockExplorerUrl}address/${address}`}
          >
            <IconButton sx={{ p: '3px', mb: '7px' }}>
              <LaunchIcon sx={{ fontSize: '10px' }} />
            </IconButton>
          </Link>
        </Tooltip>
      )}
    </Box>
  );
}
