import { useEffect, useState } from 'react';
import { Avatar, Box, Chip, Link, Skeleton, Typography } from '@mui/material';
import { PersonOutlineOutlined } from '@mui/icons-material';
import {
  addressToShortAddress,
  soulToFirstLastNameString,
  soulImage,
} from 'utils/converters';

/**
 * Component: a compact profile card.
 */
export default function SoulCompactCard({
  profile,
  disableAddress = true,
  disableLink = false,
  disableRating = true,
  sx,
}: any): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);

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
          <Avatar src={soulImage(profile)} sx={{ width: 24, height: 24 }}>
            <PersonOutlineOutlined sx={{ width: '24', heigth: '24' }} />
          </Avatar>
          <Typography variant="body2" sx={{ fontWeight: 'normal', ml: 1 }}>
            {disableLink ? (
              <>{soulToFirstLastNameString(profile)}</>
            ) : (
              <Link href={`/soul/${profile.id}`} underline="none">
                {soulToFirstLastNameString(profile)}
              </Link>
            )}
          </Typography>
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
            <PersonOutlineOutlined sx={{ width: 24, height: 24 }} />
          </Avatar>
          <Typography variant="body2" sx={{ fontWeight: 'bold', ml: 1 }}>
            Profile not found
          </Typography>
        </>
      )}
    </Box>
  );
}
