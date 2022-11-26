import { PersonOutlineOutlined } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Web3Context } from 'contexts/Web3Context';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { soulToFirstLastNameString } from 'utils/converters';
import AddressHash from 'components/web3/AddressHash';
import FundDialogButton from 'components/web3/FundDialogButton';
import EntityImage from 'components/entity/EntityImage';
import SoulDescription from './SoulDescription';
import SocialLinks from './SocialLinks';
import Loading from 'components/layout/Loading';
import { nameEntity } from 'hooks/utils';

/**
 * Soul details
 */
export default function SoulDetail({ soul, sx }: any) {
  const { account } = useContext(Web3Context);
  const [isOwned, setIsOwned] = useState<boolean>(false);
  useEffect(() => {
    setIsOwned(
      !!account && soul?.owner?.toLowerCase() === account?.toLowerCase(),
    );
  }, [soul, account]);

  if (!soul) return <Loading />;

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          ...sx,
        }}
      >
        <Box>
          <EntityImage
            item={soul}
            icon={<PersonOutlineOutlined />}
            sx={{ borderRadius: '50%' }}
          />
          {isOwned && (
            <Link href={`/souls/edit`} passHref>
              <Button
                size="small"
                variant="outlined"
                sx={{ mt: 2, width: 164 }}
              >
                Edit
              </Button>
            </Link>
          )}
        </Box>
        <Box sx={{ flexGrow: 1, mt: { xs: 2, md: 0 }, ml: { md: 4 } }}>
          {/* <Chip label={`ID: ${soul.id}`} sx={{ height: '24px', mb: 1.5 }} /> */}
          <Typography variant="h1" sx={{ fontSize: '2.25rem' }}>
            {soulToFirstLastNameString(soul)}
          </Typography>
          <AddressHash address={soul.owner} sx={{ mt: 1 }} />
          <SoulDescription soul={soul} sx={{ mt: 1 }} />
          <SocialLinks key="SocialLinks" soul={soul} sx={{ mt: 2 }} />
          <Stack key="buttons" direction="row" spacing={2} sx={{ mt: 2 }}>
            <FundDialogButton
              address={soul.owner}
              text={'Fund ' + nameEntity(soul.role)}
            />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
