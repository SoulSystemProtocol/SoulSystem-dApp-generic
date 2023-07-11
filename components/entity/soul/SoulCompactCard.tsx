import { useState } from 'react';
import {
  Avatar,
  Box,
  Link,
  Skeleton,
  Typography,
  SxProps,
  Stack,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { addressToShortAddress } from 'utils/converters';
import { soulName, soulImage, soulLink } from 'utils/soul';
import { normalizeGraphEntity } from 'helpers/metadata';

/**
 * Passive Component for a compact profile card
 */
export default function SoulCompactCard({
  profile,
  disableAddress = true,
  disableLink = false,
  disableRating = true,
  sx,
}: {
  profile: any;
  disableAddress?: boolean;
  disableLink?: boolean;
  disableRating?: boolean;
  sx?: SxProps;
}): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);

  //Process Profile (if needed)
  if (typeof profile.metadata == 'string') {
    profile = normalizeGraphEntity(profile);
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        ...sx,
      }}
    >
      {/* If profile is loading */}
      {isLoading && <Skeleton variant="rectangular" width={128} height={22} />}
      {/* If profile is loaded successfully */}
      {!isLoading && profile && (
        <>
          <Stack direction="row">
            <Avatar src={soulImage(profile)} sx={{ width: 24, height: 24 }}>
              <PersonIcon sx={{ width: 24, heigth: 24 }} />
            </Avatar>
            <Typography variant="body2" sx={{ fontWeight: 'normal', ml: 1 }}>
              {disableLink ? (
                <>{soulName(profile)}</>
              ) : (
                <Link href={soulLink(profile)}>{soulName(profile)}</Link>
              )}
            </Typography>
          </Stack>
          {!disableAddress && (
            <Typography sx={{ color: 'text.secondary', ml: 1 }}>
              ({addressToShortAddress(profile.owner)})
            </Typography>
          )}
          {!disableRating && (
            <>
              <Typography
                sx={{ color: 'success.main', fontWeight: 'bold', ml: 1.5 }}
              >
                {`+${profile.totalPositiveRating}`}
              </Typography>
              <Typography
                sx={{ color: 'danger.main', fontWeight: 'bold', ml: 1 }}
              >
                {`-${profile.totalNegativeRating}`}
              </Typography>
            </>
          )}
        </>
      )}
      {/* If profile loading is failed */}
      {!isLoading && !profile && (
        <>
          <Avatar sx={{ width: 24, height: 24 }}>
            <PersonIcon sx={{ width: 24, height: 24 }} />
          </Avatar>
          <Typography variant="body2" sx={{ fontWeight: 'bold', ml: 1 }}>
            Profile not found
          </Typography>
        </>
      )}
    </Box>
  );
}
