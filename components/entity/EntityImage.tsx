import { AutoAwesomeOutlined } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { resolveLink } from 'helpers/IPFS';

export interface EntityImageProps {
  item?: any;
  title?: string;
  alt?: string;
  icon?: any;
  imgSrc?: string;
  sx?: any;
}
/**
 * Generic entity image component.
 */
export default function EntityImage({
  item,
  title,
  alt,
  icon,
  imgSrc,
  sx = {},
}: EntityImageProps): JSX.Element {
  //Extract Image Link
  const url = imgSrc || item?.image || item?.uriImage || item?.metadata?.image;
  return (
    <Avatar
      title={title}
      alt={alt}
      sx={{
        width: 164,
        height: 164,
        borderRadius: '12%',
        ...sx,
      }}
      src={resolveLink(url as string)}
    >
      {icon || <AutoAwesomeOutlined />}
    </Avatar>
  );
}
