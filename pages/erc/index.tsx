import { useContext } from 'react';
import { Box, Button } from '@mui/material';
import { DialogContext, IDialogContext } from 'contexts/dialog';
import { DataContext } from 'contexts/data';
import { getPageTitle } from '../../utils';
// import { hexStringToJson } from 'utils/converters';
// import { resolveLink } from 'utils/metadata';
import Layout from 'components/layout/Layout';
import Deploy from 'components/erc/Deploy';

const CONF = {
  PAGE_TITLE: 'SafeNFT',
  TITLE: 'SafeNFT',
  SUBTITLE: `Mint Safe NFTs`,
};

/**
 * Page for a Safe NFT Functionality
 */
export default function SafeNFTPage({}: any) {
  const { accountSoul } = useContext(DataContext);
  const { showDialog, closeDialog } = useContext(DialogContext);

  return (
    <Layout title={getPageTitle(CONF.PAGE_TITLE)}>
      <Box>
        <Deploy />
      </Box>
    </Layout>
  );
}
