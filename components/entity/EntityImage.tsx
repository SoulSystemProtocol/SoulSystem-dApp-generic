import { AutoAwesomeOutlined } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { resolveLink } from 'helpers/IPFS';

export interface EntityImageProps {
  item?: any;
  title?: string;
  alt?: string;
  icon?: any;
  url?: string;
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
  url,
  sx = {},
}: EntityImageProps): JSX.Element {
  //Extract Image Link
  if (!url && !!item) {
    url = item?.image || item?.uriImage || item?.metadata?.image;
  }
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
      src={resolveLink(url)}
    >
      {icon || <AutoAwesomeOutlined />}
    </Avatar>
  );
}
