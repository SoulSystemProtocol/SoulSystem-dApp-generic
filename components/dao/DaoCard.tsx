import { SchoolOutlined } from '@mui/icons-material';
import { Avatar, Card, CardContent, Link as MuiLink } from '@mui/material';
import { Box } from '@mui/system';
import Link from 'next/link';

/**
 * A component with a card with dao.
 */
export default function DaoCard({ dao }: any) {
  if (dao) {
    return (
      <Card variant="outlined">
        <CardContent sx={{ p: '10px !important' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <DaoImage dao={dao} sx={{ mr: 2 }} />
            <DaoDetails dao={dao} />
          </Box>
        </CardContent>
      </Card>
    );
  }

  return <></>;
}

function DaoImage({ dao, sx }: any) {
  if (dao) {
    return (
      <Box sx={{ ...sx }}>
        <Link href={`/daos/${dao.id}`} passHref>
          <Avatar
            sx={{
              cursor: 'pointer',
              width: 82,
              height: 82,
              borderRadius: '16px',
            }}
            src={dao.uriData?.image}
          >
            <SchoolOutlined />
          </Avatar>
        </Link>
      </Box>
    );
  }

  return <></>;
}

function DaoDetails({ dao, sx }: any) {
  if (dao) {
    return (
      <Box sx={{ ...sx }}>
        <Link href={`/daos/${dao.id}`} passHref>
          <MuiLink underline="none">{dao.name}</MuiLink>
        </Link>
      </Box>
    );
  }

  return <></>;
}
