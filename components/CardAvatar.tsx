/**
 *  Card Avatar component.
 */
import { SchoolOutlined } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { Box } from '@mui/system';
import Link from 'next/link';

export default function CardAvatar({ imgSrc, avatarIcon, link, sx }: any) {
  if (imgSrc) {
    const renderAvatar = (
      <Avatar
        sx={{
          cursor: 'pointer',
          width: 82,
          height: 82,
          borderRadius: '16px',
        }}
        src={imgSrc}
      >
        {avatarIcon ? avatarIcon : <SchoolOutlined />}
      </Avatar>
    );

    const renderAvatarLink = link && (
      <Link href={link} passHref>
        {renderAvatar}
      </Link>
    );

    return <Box sx={{ ...sx }}>{renderAvatarLink || renderAvatar}</Box>;
  }

  return null;
}
