import {
  FacebookRounded,
  Instagram,
  Language,
  MailOutlineRounded,
  PersonOutlineOutlined,
  Telegram,
  Twitter,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  Chip,
  Stack,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { Box } from "@mui/system";
import { PROFILE_TRAIT_TYPE } from "constants/metadata";
import { Web3Context } from "contexts/web3";
import Link from "next/link";
import { useContext } from "react";
import {
  addressToShortAddress,
  soulToFirstLastNameString,
} from "utils/converters";
import { getTraitValue } from "utils/metadata";

/**
 * A component with soul details.
 */
export default function SoulDetail({ soul, sx }: any) {
  if (soul) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          ...sx,
        }}
      >
        <Box>
          <SoulImage soul={soul} />
          <SoulEditButton soul={soul} sx={{ mt: 2, width: 164 }} />
        </Box>
        <Box sx={{ mt: { xs: 2, md: 0 }, ml: { md: 4 } }}>
          <Chip label={`ID: ${soul.id}`} sx={{ height: "24px", mb: 1.5 }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline",
            }}
          >
            <Typography variant="h4">
              {soulToFirstLastNameString(soul)}
            </Typography>
            <Typography color="text.secondary" sx={{ ml: 1 }}>
              {addressToShortAddress(soul.owner)}
            </Typography>
          </Box>
          <SoulDescription soul={soul} sx={{ mt: 1 }} />
          <SoulLinks soul={soul} sx={{ mt: 2 }} />
        </Box>
      </Box>
    );
  }

  return <></>;
}

function SoulImage({ soul, sx }: any) {
  return (
    <Box sx={{ ...sx }}>
      <Avatar
        sx={{
          width: 164,
          height: 164,
          borderRadius: "24px",
        }}
        src={soul?.uriData?.image}
      >
        <PersonOutlineOutlined />
      </Avatar>
    </Box>
  );
}

function SoulDescription({ soul, sx }: any) {
  const description = getTraitValue(
    soul.uriData?.attributes,
    PROFILE_TRAIT_TYPE.description
  );
  if (description) {
    return <Typography sx={{ ...sx }}>{description}</Typography>;
  }
  return <></>;
}

function SoulLinks({ soul, sx }: any) {
  const email = getTraitValue(
    soul?.uriData?.attributes,
    PROFILE_TRAIT_TYPE.email
  );
  const site = getTraitValue(
    soul?.uriData?.attributes,
    PROFILE_TRAIT_TYPE.site
  );
  const twitter = getTraitValue(
    soul?.uriData?.attributes,
    PROFILE_TRAIT_TYPE.twitter
  );
  const telegram = getTraitValue(
    soul?.uriData?.attributes,
    PROFILE_TRAIT_TYPE.telegram
  );
  const facebook = getTraitValue(
    soul?.uriData?.attributes,
    PROFILE_TRAIT_TYPE.facebook
  );
  const instagram = getTraitValue(
    soul?.uriData?.attributes,
    PROFILE_TRAIT_TYPE.instagram
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
