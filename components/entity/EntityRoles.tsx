import {
  Badge,
  BadgeProps,
  Box,
  Card,
  IconButton,
  Stack,
  SxProps,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { SelectedGameContext } from 'contexts/SelectedGame';
import { DataContext } from 'contexts/data';
import { isSoulHasRole } from 'hooks/utils';
import { useContext, useEffect, useState } from 'react';
import EntityRolesAddDialog from './EntityRoleAddDialog';
import { DialogContext } from 'contexts/dialog';
import DefaultRoleImage from 'components/DefaultRoleImage';
import { SelectedSoulContext } from 'contexts/SelectedSoul';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import GameRoleManageDialog from './game/GameRoleManageDialog';

/**
 * CTX Roles
 */
export default function EntityRoles({ sx }: { sx?: SxProps }): JSX.Element {
  const { accountSoul } = useContext(DataContext);
  const { game } = useContext(SelectedGameContext);
  const { soul } = useContext(SelectedSoulContext);
  const { showDialog, closeDialog } = useContext(DialogContext);
  const [isAdmin, setIsAdmin] = useState(false);

  const theme = useTheme();
  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

  useEffect(() => {
    setIsAdmin(
      !!accountSoul && !!game && isSoulHasRole(game, accountSoul.id, 'admin'),
    );
  }, [game, accountSoul]);

  if (!game) return <>...</>;

  return (
    <Box sx={{ sm: 12, ...sx }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: -1 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h3" gutterBottom>
            Roles in {soul.name}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Tokens in this organization that can be used to manage permissions
          </Typography>
        </Box>

        <Box>
          <Tooltip
            title={`Mint & burn role NFTs ${!isAdmin ? ' (admin only)' : ''}`}
          >
            <span>
              <IconButton
                disabled={!isAdmin}
                onClick={() =>
                  showDialog?.(
                    <GameRoleManageDialog game={game} onClose={closeDialog} />,
                  )
                }
                sx={{ border: `2px solid ${theme.palette.grey[600]}`, mr: 2 }}
              >
                <EditIcon />
              </IconButton>
            </span>
          </Tooltip>

          <Tooltip
            title={`Create a new role token ${!isAdmin ? '(admin only)' : ''}`}
          >
            <span>
              <IconButton
                disabled={!isAdmin}
                onClick={() =>
                  showDialog?.(
                    <EntityRolesAddDialog game={game} onClose={closeDialog} />,
                  )
                }
                sx={{ border: `2px solid ${theme.palette.grey[600]}` }}
              >
                <AddIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      </Box>

      <Stack direction="row" flexWrap="wrap">
        {game.roles.map((role: any) => {
          
          console.warn('Role Data', role);
          //TODO: Pull actual metadata from Tokens

          return (
            <Card
              key={role.name}
              sx={{
                width: { xs: 160, sm: 200 },
                borderRadius: '15px',
                overflow: 'hidden',
                mr: 2,
                mb: 2,
              }}
            >
              <DefaultRoleImage
                role={role.name}
                game={soul.name}
                style={{ height: 200, width: '100%' }}
              />

              <Box
                sx={{
                  maxWidth: '100%',
                  py: 1,
                  px: 2,
                  pb: 2,
                }}
              >
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body1">{role.name}</Typography>
                  <Tooltip title="Tokens owners">
                    <StyledBadge badgeContent={role.soulsCount.toString()} />
                  </Tooltip>
                </Stack>
                <Typography>{role.description}</Typography>
              </Box>
            </Card>
          );
        })}
      </Stack>
    </Box>
  );
}
