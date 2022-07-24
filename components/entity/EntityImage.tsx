import { WorkOutlineOutlined } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { Box } from '@mui/system';

/**
 * Genric Entity Image Component
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
        src={item?.uriData?.image}
      >
        <WorkOutlineOutlined />
      </Avatar>
    </Box>
  );
}
