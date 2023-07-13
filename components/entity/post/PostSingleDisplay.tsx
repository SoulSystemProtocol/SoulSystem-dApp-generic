import { Grid, Paper, Stack, Chip, Typography, Box } from '@mui/material';
import SoulCompactCard from 'components/entity/soul/SoulCompactCard';
import Link from 'components/utils/Link';

export default function PostSingleDisplay({
  post,
  children,
}: {
  post: any;
  children?: JSX.Element;
}): JSX.Element {
  // console.log('post', post);

  return (
    <Grid item key={post.id} xs={12}>
      <Paper sx={{ p: 2 }}>
        {/* Author */}
        <Stack direction="row" spacing={1} alignItems="center">
          <SoulCompactCard profile={post.author} />
          <Chip key={post.entityRole} label={post.entityRole} size="small" />
        </Stack>
        {/* Message */}
        <Paper variant="outlined" sx={{ p: 2, mt: 1 }}>
          <Stack direction="row" spacing={1} justifyContent="space-between">
            <Box>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 'normal',
                  overflow: 'hidden',
                  fontSize: '0.8rem',
                }}
                gutterBottom
              >
                {post?.metadata?.text}
              </Typography>
              {post?.metadata?.link && (
                <Typography variant="body2" sx={{ fontSize: '0.7em', mb: 1 }}>
                  <Link target="_blank" href={post.metadata.link}>
                    {post.metadata.link}
                  </Link>
                </Typography>
              )}
            </Box>
            {children}
          </Stack>
          <Typography variant="body2" sx={{ fontSize: '0.7em', opacity: 0.66 }}>
            {new Date(post.createdDate * 1000).toLocaleString()}
          </Typography>
        </Paper>
      </Paper>
    </Grid>
  );
}
