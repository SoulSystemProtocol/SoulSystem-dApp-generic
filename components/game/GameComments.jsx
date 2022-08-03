import { Button, Paper, Stack, Typography, Chip } from '@mui/material';
import { Box } from '@mui/system';
import { DataContext } from 'contexts/data';
import { useEffect, useState, useContext } from 'react';
import { hexStringToJson } from 'utils/converters';
import GamePostAddDialog from './GamePostAddDialog';
import SoulCompactCard from 'components/soul/SoulCompactCard';
import { DialogContext } from 'contexts/dialog';
import { roleIdToName } from 'utils/converters';
import usePost from 'hooks/usePost';

/**
 * Posts component for Game Entities.
 */
export default function GameComments({ item, sx = {} }) {
  const { accountSoul } = useContext(DataContext);
  const { showDialog, closeDialog } = useContext(DialogContext);
  const { processGraphPost } = usePost();
  const [commentPosts, setCommentsPosts] = useState([]);

  const isProfileHasAnyCaseRole = () => true; //Temporary
  // const { isSoulHasRole } = useTask();

  useEffect(() => {
    if (item) {
      const commentPosts = item?.posts; //?.filter( (post) => post.uriType === 'comment', );
      commentPosts && console.log('commentPosts', commentPosts);
      //Sort by Date
      const sortedCommentPosts = commentPosts?.sort((a, b) =>
        a?.createdDate?.localeCompare(b?.createdDate),
      );
      setCommentsPosts(sortedCommentPosts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  console.log('Comments:', commentPosts);
  return (
    <Box sx={sx}>
      {/* Comments */}
      {commentPosts.length == 0 ? (
        <Typography>No comments</Typography>
      ) : (
        <Stack spacing={1}>
          {commentPosts.map((post, index) => {
            //Process Data
            post = processGraphPost(post);
            // console.log('Post:', post);
            return (
              <Paper key={index} sx={{ p: 2 }}>
                {/* Author */}
                <Stack direction="row" spacing={1} alignItems="center">
                  <SoulCompactCard profileId={post.author.id} />
                  <Typography variant="body2" color="text.secondary">
                    <Chip
                      key={post.entityRole}
                      label={post.entityRole}
                      size="small"
                    />
                  </Typography>
                </Stack>
                {/* Message */}
                <Paper variant="outlined" sx={{ p: 2, mt: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 'normal' }}
                    gutterBottom
                  >
                    {post.metadata.text}
                  </Typography>
                  <Typography
                    variant="small"
                    sx={{ fontSize: '0.7em', opacity: 0.66 }}
                  >
                    {new Date(post.createdDate * 1000).toLocaleString()}
                  </Typography>
                </Paper>
              </Paper>
            );
          })}
        </Stack>
      )}
      {
        //item?.stage === CLAIM_STAGE.open &&    //TODO: Enable this on Protocol version 0.5.3 (Disply only if has a soul in a role)
        isProfileHasAnyCaseRole(item, accountSoul?.id) && (
          <Box sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              onClick={() =>
                showDialog(
                  <GamePostAddDialog
                    item={item}
                    postType={'comment'}
                    onClose={closeDialog}
                  />,
                )
              }
            >
              Add Post
            </Button>
          </Box>
        )
      }
    </Box>
  );
}
