import { WorkOutlineOutlined } from '@mui/icons-material';
import { Avatar, Card, CardContent, Link as MuiLink, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Link from 'next/link';

/**
 * A component with a card with project.
 */
export default function ProjectCard({ project }: any) {
  if (project) {
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
            <ProjectImage project={project} sx={{ mr: 2 }} />
            <ProjectDetails project={project} />
          </Box>
        </CardContent>
      </Card>
    );
  }

  return <></>;
}

function ProjectImage({ project, sx }: any) {
  if (project) {
    return (
      <Box sx={{ ...sx }}>
        <Link href={`/projects/${project.id}`} passHref>
          <Avatar
            sx={{
              cursor: 'pointer',
              width: 82,
              height: 82,
              borderRadius: '16px',
            }}
            src={project.uriData?.image}
          >
            <WorkOutlineOutlined />
          </Avatar>
        </Link>
      </Box>
    );
  }

  return <></>;
}

function ProjectDetails({ project, sx }: any) {
  if (project) {
    return (
      <Box sx={{ ...sx }}>
        <Link href={`/projects/${project.id}`} passHref>
          <MuiLink underline="none">{project.name}</MuiLink>
        </Link>
        {project.uriData.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {project.uriData.description}
          </Typography>
        )}
      </Box>
    );
  }

  return <></>;
}
