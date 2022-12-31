import { Grid, Paper, Stack, Chip, Typography } from '@mui/material';
import SoulCompactCard from 'components/entity/soul/SoulCompactCard';

export default function PostSingleDisplay({
  post,
  children,
}: {
  post: any;
  children?: JSX.Element;
}): JSX.Element {
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
            <Typography
              variant="body2"
              sx={{ fontWeight: 'normal' }}
              gutterBottom
            >
              {post?.metadata?.text}
            </Typography>
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
