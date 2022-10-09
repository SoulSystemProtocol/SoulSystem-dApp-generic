import { AutoAwesomeOutlined } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { resolveLink } from 'helpers/IPFS';

/**
 * Generic entity image component.
 */
export default function EntityImage({ item, title, alt, icon, sx = {} }: any) {
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
      src={resolveLink(item?.image || item?.uriData?.image)}
    >
      {icon || <AutoAwesomeOutlined />}
    </Avatar>
  );
}
