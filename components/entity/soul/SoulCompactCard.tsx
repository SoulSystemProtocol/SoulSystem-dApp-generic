import { Avatar, Box, Chip, Link, Skeleton, Typography } from '@mui/material';
import useError from 'hooks/useError';
// import useProfile from 'hooks/useProfile';
import useSoul from 'hooks/useSoul';
import { PersonOutlineOutlined } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import {
  addressToShortAddress,
  soulToFirstLastNameString,
  soulImage,
} from 'utils/converters';

/**
 * Component: a compact profile card.
 */
export default function SoulCompactCard({
  profile: propsProfile,
  profileId: propsProfileId,
  account: propsAccount,
  disableId = true,
  disableAddress = true,
  disableLink = false,
  disableRating = true,
  sx,
}: any): JSX.Element {
  const { handleError } = useError();
  // const { getProfile } = useProfile();
  const { getSoulById, getSoulByOwner } = useSoul();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    let isComponentActive = true;
    setIsLoading(true);
    setProfile(null);
    // Set profile if already defined
    if (propsProfile) {
      setProfile(propsProfile);
      setIsLoading(false);
    }
    // Else load profile by profile id or account
    else if (propsProfileId || propsAccount) {
      // getProfile(
      //   propsProfileId ? { id: propsProfileId } : { owner: propsAccount },
      // )
      let promise = propsProfileId
        ? getSoulById(propsProfileId)
        : getSoulByOwner(propsAccount);
      promise
        .then((profile) => {
          if (isComponentActive && profile) {
            setProfile(profile);
          }
        })
        .catch((error) => handleError(error, true))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
    /* REMOVED - useEffect doesn't return anything.
    return () => {
      isComponentActive = false;
    };
    */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propsProfile, propsProfileId, propsAccount]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
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
              <Link href={`/souls/${profile.id}`} underline="none">
                {soulToFirstLastNameString(profile)}
              </Link>
            )}
          </Typography>
          {!disableId && (
            <Chip size="small" label={`ID: ${profile.id}`} sx={{ ml: 1 }} />
          )}
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
