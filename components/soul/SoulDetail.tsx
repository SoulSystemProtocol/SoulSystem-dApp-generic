import {
  FacebookRounded,
  Instagram,
  Language,
  MailOutlineRounded,
  PersonOutlineOutlined,
  Telegram,
  Twitter,
} from '@mui/icons-material';
import {
  // Avatar,
  Button,
  Stack,
  Typography,
  Link as MuiLink,
} from '@mui/material';
import { Box } from '@mui/system';
import { PROFILE_TRAIT_TYPE } from 'constants/metadata';
import { Web3Context } from 'contexts/web3';
import Link from 'next/link';
import { useContext } from 'react';
import { soulToFirstLastNameString } from 'utils/converters';
import { getTraitValue } from 'helpers/metadata';
import AddressHash from 'components/web3/AddressHash';
import FundDialogButton from 'components/web3/FundDialogButton';
import EntityImage from 'components/entity/EntityImage';
// import { GAME_NAME } from 'constants/contracts';

/**
 * Component:  soul details.
 */
export default function SoulDetail({ soul, sx }: any) {
  if (!soul) return <></>;
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
          <EntityImage item={soul} icon={<PersonOutlineOutlined />} sx={{ borderRadius: '50%' }} />
          <SoulEditButton soul={soul} sx={{ mt: 2, width: 164 }} />
        </Box>
        <Box sx={{ flexGrow: 1, mt: { xs: 2, md: 0 }, ml: { md: 4 } }}>
          {/* <Chip label={`ID: ${soul.id}`} sx={{ height: '24px', mb: 1.5 }} /> */}
          <Typography variant="h1" sx={{ fontSize: '2.25rem' }}>
            {soulToFirstLastNameString(soul)}
          </Typography>
          <AddressHash address={soul.owner} sx={{ mt: 1 }} />
          <SoulDescription soul={soul} sx={{ mt: 1 }} />
          <SoulLinks soul={soul} sx={{ mt: 2 }} />
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <FundDialogButton address={soul.owner} />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

function SoulDescription({ soul, sx }: any) {
  const description = getTraitValue(
    soul?.metadata?.attributes,
    PROFILE_TRAIT_TYPE.description,
  );
  if (description) {
    return <Typography sx={{ ...sx }}>{description}</Typography>;
  }
  return <></>;
}

function SoulLinks({ soul, sx }: any) {
  // Fetch Traits
  const email = getTraitValue(
    soul?.metadata?.attributes,
    PROFILE_TRAIT_TYPE.email,
  );
  const site = getTraitValue(
    soul?.metadata?.attributes,
    PROFILE_TRAIT_TYPE.site,
  );
  const twitter = getTraitValue(
    soul?.metadata?.attributes,
    PROFILE_TRAIT_TYPE.twitter,
  );
  const telegram = getTraitValue(
    soul?.metadata?.attributes,
    PROFILE_TRAIT_TYPE.telegram,
  );
  const facebook = getTraitValue(
    soul?.metadata?.attributes,
    PROFILE_TRAIT_TYPE.facebook,
  );
  const instagram = getTraitValue(
    soul?.metadata?.attributes,
    PROFILE_TRAIT_TYPE.instagram,
  );

  return (
    <Stack direction="row" spacing={2} sx={{ ...sx }}>
      {email && (
        <MuiLink href={`mailto:${email}`} target="_blank">
          <MailOutlineRounded />
        </MuiLink>
      )}
      {site && (
        <Link href={site} target="_blank">
          <Language />
        </Link>
      )}
      {twitter && (
        <MuiLink href={`https://twitter.com/${twitter}`} target="_blank">
          <Twitter />
        </MuiLink>
      )}
      {telegram && (
        <MuiLink href={`https://t.me/${telegram}`} target="_blank">
          <Telegram />
        </MuiLink>
      )}
      {facebook && (
        <MuiLink href={`https://facebook.com/${facebook}`} target="_blank">
          <FacebookRounded />
        </MuiLink>
      )}
      {instagram && (
        <MuiLink href={`https://instagram.com/${instagram}`} target="_blank">
          <Instagram />
        </MuiLink>
      )}
    </Stack>
  );
}

function SoulEditButton({ soul, sx }: any) {
  const { account } = useContext(Web3Context);

  if (soul?.owner?.toLowerCase() === account?.toLowerCase()) {
    return (
      <Link href={`/souls/edit`} passHref>
        <Button size="small" variant="outlined" sx={{ ...sx }}>
          Edit
        </Button>
      </Link>
    );
  } else {
    return <></>;
  }
}
