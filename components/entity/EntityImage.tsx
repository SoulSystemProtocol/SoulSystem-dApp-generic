import { AutoAwesomeOutlined } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { Box } from '@mui/system';

/**
 * Generic entity image component.
 */
export default function EntityImage({ item, title, alt, sx = {} }: any) {
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
      src={item?.image || item?.uriData?.image}
    >
      <AutoAwesomeOutlined />
    </Avatar>
  );
}
