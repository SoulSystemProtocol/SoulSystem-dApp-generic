import { SchoolOutlined } from '@mui/icons-material';
import { Box } from '@mui/system';
import Link from 'next/link';
import EntityImage from './entity/EntityImage';

/**
 *  Component: Card Avatar Image
 */
export default function CardAvatar({ imgSrc, avatarIcon, link, sx }: any) {
  //Image
  const renderAvatar = (
    // <Avatar
    //   sx={{
    //     cursor: link ? 'pointer' : 'default',
    //     width: 82,
    //     height: 82,
    //     borderRadius: '12%',
    //     ...sx,
    //   }}
    //   src={resolveLink(imgSrc)}
    // >
    //   {avatarIcon || <SchoolOutlined />}
    // </Avatar>

    <EntityImage
      imgSrc={imgSrc}
      icon={avatarIcon || <SchoolOutlined />}
      sx={{
        cursor: link ? 'pointer' : 'default',
        width: 82,
        height: 82,
        ...sx,
      }}
    />
  );

  //Optinal Link
  const renderAvatarLink = link && (
    <Link href={link} passHref>
      {renderAvatar}
    </Link>
  );

  return <Box>{renderAvatarLink || renderAvatar}</Box>;
}
