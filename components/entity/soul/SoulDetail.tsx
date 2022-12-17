import { PersonOutlineOutlined } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Web3Context } from 'contexts/Web3Context';
import { useContext, useEffect, useState } from 'react';
import { nameSoul } from 'utils/converters';
import AddressHash from 'components/web3/AddressHash';
import FundDialogButton from 'components/web3/FundDialogButton';
import EntityImage from 'components/entity/EntityImage';
import SoulDescription from './SoulDescription';
import SocialLinks from './SocialLinks';
import Loading from 'components/layout/Loading';
import { nameEntity } from 'hooks/utils';
import Link from 'components/utils/Link';
import { resolveLink } from 'helpers/IPFS';
import { darkTheme as theme } from 'constants/theme';

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
  const coverImageSrc = resolveLink(soul?.metadata?.cover);
  return (
    <>
      <div
        className="cover"
        style={{
          width: '100%',
          height: '230px',
          overflow: 'hidden',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          borderRadius: '12px',
          background:
            'url(' + coverImageSrc + ') center center / cover no-repeat',
        }}
      ></div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          mb: { xs: 1, md: 2 },
          ...sx,
        }}
      >
        <Stack
          direction="column"
          sx={{
            margin: '0 auto',
            justifyContent: 'center',
          }}
        >
          <EntityImage
            item={soul}
            icon={<PersonOutlineOutlined />}
            sx={{
              borderRadius: '50%',
              border: '5px solid ' + theme.palette.background.default,
              mt: '-60px',
              ml: 'auto',
              mr: 'auto',
            }}
          />
          <Stack
            key="buttons"
            direction={{ xs: 'row', md: 'column' }}
            spacing={2}
            sx={{ mt: 2 }}
          >
            <FundDialogButton
              address={soul.owner}
              disabled={isOwned}
              text={'Fund ' + nameEntity(soul.role)}
            />
            {isOwned && (
              <Link href={`/soul/edit`}>
                <Button
                  size="small"
                  variant="outlined"
                  sx={{
                    mt: 2,
                    width: { md: '100%', xs: 'auto' },
                    margin: 0,
                    display: 'block',
                    minWidth: '120px',
                  }}
                >
                  Edit
                </Button>
              </Link>
            )}
          </Stack>
        </Stack>

        <Stack
          direction="column"
          spacing={1}
          sx={{ flexGrow: 1, mt: { xs: 2, md: 0 }, ml: { md: 4 } }}
        >
          <Typography variant="h1">{nameSoul(soul)}</Typography>
          <AddressHash address={soul.owner} sx={{ mt: 1 }} />
          <SoulDescription soul={soul} sx={{ mt: 1 }} />
          <SocialLinks key="SocialLinks" soul={soul} sx={{ mt: 2 }} />
        </Stack>
      </Box>
    </>
  );
}
