import { PersonOutlineOutlined } from '@mui/icons-material';
import { Box } from '@mui/material';
import Link from 'next/link';
import EntityImage from '../EntityImage';

/**
 * Soul Image for Small Cards w/Link
 */
export default function SoulCardImage({ soul, sx }: any): JSX.Element {
  return (
    <Box sx={{ ...sx }}>
      <Link href={soul ? `/soul/${soul.id}` : ''}>
        <EntityImage
          item={soul}
          sx={{
            cursor: 'pointer',
            width: 82,
            height: 82,
          }}
          icon={<PersonOutlineOutlined />}
        />
      </Link>
    </Box>
  );
}
