import { Box } from '@mui/material';
import { ReactElement, useEffect, useState } from 'react';
import ImageBox from 'components/utils/ImageBox';
import { resolveLink } from 'helpers/IPFS';
import Link from 'components/utils/Link';
import { fetchLensProfileByOwner, LensProfile } from 'services/lens/client';

/**
 * [WIP] Fetch Lens Protocol Profile Data
 */
export default function SoulLensProfile({
  address,
}: {
  address: string;
}): ReactElement {
  const [profile, setProfile] = useState<LensProfile | null>();

  useEffect(() => {
    let isCurrent = true;

    if (!address) {
      setProfile(null);
      return;
    }

    fetchLensProfileByOwner(address)
      .then((profile) => {
        if (isCurrent) setProfile(profile);
      })
      .catch(() => {
        if (isCurrent) {
          console.error('Error loading Lens profile');
          setProfile(null);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [address]);

  if (!profile?.imageURI) return <></>;

  const profileImage = (
    <ImageBox
      src={resolveLink(profile.imageURI)}
      sx={{
        height: '32px',
        width: '32px',
      }}
      title={`Lens Protocol: ${profile.displayName || profile.handle}`}
    />
  );

  if (!profile.profileUrl) return <Box>{profileImage}</Box>;

  return (
    <Box>
      <Link href={profile.profileUrl} target="_blank">
        {profileImage}
      </Link>
    </Box>
  );
}
