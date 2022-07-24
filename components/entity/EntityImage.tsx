import { AutoAwesomeOutlined } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { Box } from '@mui/system';

/**
 * Generic entity image component.
 */
export default function EntityImage({ item, sx }: any) {
  return (
    <Box sx={{ ...sx }}>
      <Avatar
        sx={{
          width: 164,
          height: 164,
          borderRadius: '24px',
        }}
        src={item?.image || item?.uriData?.image}
      >
        <AutoAwesomeOutlined />
      </Avatar>
    </Box>
  );
}
