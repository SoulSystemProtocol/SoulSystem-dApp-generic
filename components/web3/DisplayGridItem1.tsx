import { Avatar, Grid, Stack, Tooltip } from '@mui/material';
import { SupervisedUserCircle } from '@mui/icons-material';
// import Link from 'components/utils/Link';

/**
 * Component: Display Single NFT Item (w/Tootip)
 */
export default function DisplayGridItem1({
  props,
  name,
  title,
  image_url,
}: any): JSX.Element {
  return (
    <Grid item {...props}>
      <Tooltip title={title}>
        <Stack direction="column" spacing={1}>
          <Avatar
            alt={name}
            sx={{
              width: '96%',
              height: '96%',
              // borderRadius: '12%',
            }}
            src={image_url}
          >
            <SupervisedUserCircle />
          </Avatar>
          {/* <Box>
            <Link href={`/POAP/${item.id}`}>
            <Typography variant="body1">{name}</Typography>
            </Link>
          </Box> */}
        </Stack>
      </Tooltip>
    </Grid>
  );
}
