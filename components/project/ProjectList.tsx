import { Grid, Typography } from '@mui/material';
import ProjectCard from './ProjectCard';

/**
 * A component with a list of projects.
 */
export default function ProjectList({ projects, sx }: any) {
  return (
    <Grid container spacing={2} sx={{ ...sx }}>
      {!projects && (
        <Grid item xs={12}>
          <Typography>Loading...</Typography>
        </Grid>
      )}
      {projects?.length === 0 && (
        <Grid item xs={12}>
          <Typography>No projects</Typography>
        </Grid>
      )}
      {projects?.length > 0 && (
        <>
          {projects.map((project: any, index: number) => (
            <Grid key={index} item xs={12} md={6} lg={4}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </>
      )}
    </Grid>
  );
}
