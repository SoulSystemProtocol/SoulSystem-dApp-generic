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
import PostAddDialog from './PostAddDialog';
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
  const { isGamePart } = useSubgraph();
  const { handleError } = useError();
  const [postItems, setPostItems] = useState<Array<any>>([]);
  const [hasAnyRole, setHasAnyRole] = useState<boolean>(false);

  useEffect(() => {
    setPostItems(
      //Posts, Sorted by Date
      item?.posts?.sort((a: any, b: any) =>
        a?.createdDate?.localeCompare(b?.createdDate),
      ) || [],
    );
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
        {postItems.length == 0 ? (
          <Grid item key="empty" xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="caption">{NO_RESULTS}</Typography>
            </Paper>
          </Grid>
        ) : (
          <>
            {postItems.map((post: any) => {
              //Process Entity
              post = normalizeGraphEntity(post);
              console.log('Render Post:', {
                post,
                type: post?.metadata?.type,
                types,
                isIn: types?.includes(post?.metadata?.type),
              });
              return !types || types.includes(post?.metadata?.type) ? (
                <PostSingleDisplay key={post.id} post={post} />
              ) : null;
            })}
          </>
        )}
      </Grid>
      <Box sx={{ mt: 2 }}>
        <Tooltip title={!hasAnyRole ? 'Members Only' : ''}>
          <span>
            <Button
              size="small"
              variant="outlined"
              disabled={!hasAnyRole}
              onClick={() =>
                showDialog?.(
                  <PostAddDialog
                    item={item}
                    postType={types ? types[0] : 'post'}
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
