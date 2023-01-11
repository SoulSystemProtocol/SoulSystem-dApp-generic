import {
  Button,
  Box,
  Paper,
  SxProps,
  Grid,
  Tooltip,
  Typography,
} from '@mui/material';
import { DataContext } from 'contexts/data';
import { useEffect, useState, useContext } from 'react';
import { DialogContext } from 'contexts/dialog';
import GamePostAddDialog from './GamePostAddDialog';
import useError from 'hooks/useError';
import useSubgraph from 'hooks/useSubgraph';
import { normalizeGraphEntity } from 'helpers/metadata';
import PostSingleDisplay from './PostSingleDisplay';
import { NO_RESULTS } from 'constants/texts';

/**
 * Display Multiple Posts By Entity
 */
export default function EntityPosts({
  item,
  types,
  sx = {},
}: {
  item: any;
  types?: string[];
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
      <Grid container spacing={2}>
        {/* Comments */}
        {commentPosts.length == 0 ? (
          <Grid item key="empty" xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="caption">{NO_RESULTS}</Typography>
            </Paper>
          </Grid>
        ) : (
          <>
            {commentPosts.map((post: any) => {
              //Process Entity
              post = normalizeGraphEntity(post);
              console.log('Render Post:', {
                post,
                type: post?.metadata?.type,
                types,
                isIn: types?.includes(post?.metadata?.type),
              });
              return !types || types.includes(post?.metadata?.type) ? (
                <PostSingleDisplay post={post} />
              ) : null;
            })}
          </>
        )}
      </Grid>
      {/* //item?.stage === PROC_STAGE_REV.open &&    //TODO: Enable this on Protocol version 0.5.3 (Disply only if has a soul in a role) */}

      <Box sx={{ mt: 2 }}>
        <Tooltip title={!hasAnyRole ? 'Members Only' : ''}>
          <span>
            <Button
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
              Write Post
            </Button>
          </span>
        </Tooltip>
      </Box>
    </Box>
  );
}
