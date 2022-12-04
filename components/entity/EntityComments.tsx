import {
  Box,
  Button,
  Paper,
  Stack,
  Typography,
  Chip,
  SxProps,
} from '@mui/material';
import { DataContext } from 'contexts/data';
import { useEffect, useState, useContext } from 'react';
import { DialogContext } from 'contexts/dialog';
import GamePostAddDialog from './game/GamePostAddDialog';
import SoulCompactCard from 'components/entity/soul/SoulCompactCard';
import useError from 'hooks/useError';
import useSubgraph from 'hooks/useSubgraph';
import { normalizeGraphEntity } from 'helpers/metadata';
import ConditionalButton from 'components/layout/ConditionalButton';

/**
 * Posts component for Entities.
 */
export default function EntityComments({
  item,
  sx = {},
}: {
  item: any;
  sx?: SxProps;
}): JSX.Element {
  const { accountSoul } = useContext(DataContext);
  const { showDialog, closeDialog } = useContext(DialogContext);
  const [commentPosts, setCommentsPosts] = useState([]);
  const [hasAnyRole, setHasAnyRole] = useState(false);

  const { isGamePart } = useSubgraph();
  const { handleError } = useError();

  useEffect(() => {
    if (item) {
      const commentPosts = item?.posts; //?.filter( (post) => post.uriType === 'comment', );
      // commentPosts && console.log('commentPosts', commentPosts);
      //Sort by Date
      const sortedCommentPosts = commentPosts?.sort((a: any, b: any) =>
        a?.createdDate?.localeCompare(b?.createdDate),
      );
      setCommentsPosts(sortedCommentPosts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  useEffect(() => {
    //Check if Souls is part of this game
    !item?.id || !accountSoul?.id
      ? setHasAnyRole(false)
      : isGamePart(item.id.toString(), accountSoul.id.toString())
          .then((res) => setHasAnyRole(res))
          .catch((error) => handleError(error, true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, accountSoul]);

  return (
    <Box sx={sx}>
      {/* Comments */}
      {commentPosts.length == 0 ? (
        <Typography></Typography>
      ) : (
        <Stack spacing={1}>
          {commentPosts.map((post: any, index) => {
            //Process Data
            post = normalizeGraphEntity(post);
            console.log('Processed post:', post);
            return (
              <Paper key={index} sx={{ p: 2 }}>
                {/* Author */}
                <Stack direction="row" spacing={1} alignItems="center">
                  <SoulCompactCard profile={post.author} />
                  <Chip
                    key={post.entityRole}
                    label={post.entityRole}
                    size="small"
                  />
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
                    variant="body2"
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

      {/* //item?.stage === PROC_STAGE.open &&    //TODO: Enable this on Protocol version 0.5.3 (Disply only if has a soul in a role) */}

      <Box sx={{ mt: 2 }}>
        <ConditionalButton
          variant="outlined"
          disabled={!hasAnyRole}
          onClick={() =>
            showDialog?.(
              <GamePostAddDialog
                item={item}
                postType={'comment'}
                onClose={closeDialog}
              />,
            )
          }
        >
          Add Post
        </ConditionalButton>
      </Box>
    </Box>
  );
}
