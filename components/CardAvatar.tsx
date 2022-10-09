import { SchoolOutlined } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { Box } from '@mui/system';
import Link from 'next/link';
import { resolveLink } from 'helpers/IPFS';

/**
 *  Component: Card Avatar Image
 */
export default function CardAvatar({ imgSrc, avatarIcon, link, sx }: any) {
  //Image
  const renderAvatar = (
    <Avatar
      sx={{
        cursor: 'pointer',
        width: 82,
        height: 82,
        borderRadius: '12%',
        ...sx,
      }}
      src={resolveLink(imgSrc)}
    >
      {avatarIcon || <SchoolOutlined />}
    </Avatar>
  );

  //Optinal Link
  const renderAvatarLink = link && (
    <Link href={link} passHref>
      {renderAvatar}
    </Link>
  );

  return <Box>{renderAvatarLink || renderAvatar}</Box>;
}
