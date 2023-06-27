import { PersonOutlineOutlined } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Web3Context } from 'contexts/Web3Context';
import { useContext, useEffect, useState } from 'react';
import { soulCover, soulImage, soulName } from 'utils/soul';
import AddressHash from 'components/web3/AddressHash';
import FundDialogButton from 'components/web3/FundDialogButton';
import EntityImage from 'components/entity/EntityImage';
import SoulDescription from './SoulDescription';
import SocialLinks from './SocialLinks';
import Loading from 'components/layout/Loading';
import { nameEntity } from 'helpers/utils';
import Link from 'components/utils/Link';
import ImageBox from 'components/utils/ImageBox';

/**
 * Display Soul details
 */
export default function SoulDetail({
  soul,
  sx,
}: {
  soul: any;
  sx?: any;
}): JSX.Element {
  const { account } = useContext(Web3Context);
  const [isOwned, setIsOwned] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const theme = useTheme();

  useEffect(() => {
    setName(soulName(soul));
    setIsOwned(
      !!account && soul?.owner?.toLowerCase() === account?.toLowerCase(),
    );
  }, [soul, account]);

  if (!soul) return <Loading />;
  return (
    <>
      <ImageBox sx={{ height: '230px' }} src={soulCover(soul)} />
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
            imgSrc={soulImage(soul)}
            icon={<PersonOutlineOutlined sx={{ fontSize: '50px' }} />}
            sx={{
              borderRadius: '50%',
              border: '5px solid ' + theme.palette.background.default,
              backgroundColor: theme.palette.background.default,
              mt: '-60px',
              ml: 'auto',
              mr: 'auto',
            }}
          />
          <Stack
            key="buttons"
            direction={{ xs: 'row', md: 'column' }}
            spacing={2}
            sx={{ mt: 2, justifyContent: 'center' }}
          >
            <FundDialogButton
              address={soul.owner}
              disabled={
                isOwned ||
                soul.owner == process.env.NEXT_PUBLIC_SOUL_CONTRACT_ADDRESS
              }
              sx={{ px: '25px' }}
              text={'Sponsor ' + nameEntity(soul.role)}
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
          sx={{ flexGrow: 1, mt: { xs: 2, md: 2 }, ml: { md: 4 } }}
        >
          <Typography variant="h1">{name}</Typography>
          <AddressHash address={soul.owner} sx={{ mt: 1 }} />
          <SoulDescription soul={soul} sx={{ mt: 1 }} />
          <SocialLinks key="SocialLinks" soul={soul} sx={{ mt: 2 }} />
        </Stack>
      </Box>
    </>
  );
}
