import { Box, Card, Divider, MenuItem, Stack, Typography } from '@mui/material';
import SoulList from 'components/entity/soul/SoulList';
import useError from 'hooks/useError';
import useSoulsById from 'hooks/useSoulsById';
import { nameRole } from 'helpers/utils';
import { union } from 'lodash';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

/**
 * Display Game Members (CTX Parts)
 */
export default function GameMembers({ game, sx }: any): JSX.Element {
  const { handleError } = useError();
  const [soulIds, setSoulIds] = useState<Array<string>>([]);
  const { souls } = useSoulsById(soulIds, 24);
  const [soulRoles, setSoulRoles] = useState<Object | {}>({});
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    if (game) {
      try {
        let allSouls: any[] = [];
        //Soul's Roles
        const roles: { [key: string]: Array<any> } = {};
        for (let i = 0; i < game.roles.length; i++) {
          //Filter By Role
          if (selectedRole == '' || selectedRole == game.roles[i].roleId) {
            allSouls = union(allSouls, game.roles[i].souls);
          }
          for (let j = 0; j < game.roles[i].souls.length; j++) {
            //Fetch Soul
            const soulId = game.roles[i].souls[j];
            //Init Element
            if (!roles[soulId]) roles[soulId] = Array();
            //Register Roles
            // roles[soulId].push(nameRole(game.roles[i].name, 'game'));
            roles[soulId].push({
              id: game.roles[i].roleId,
              name: nameRole(game.roles[i].name, 'game'),
            });
          }
        }
        setSoulIds(allSouls);
        setSoulRoles(roles);
      } catch (error: any) {
        handleError(error, true);
        setSoulIds([]);
        setSoulRoles({});
      }
    }
  }, [game, selectedRole]);

  if (!game) return <></>;
  return (
    <Box sx={{ sm: 12, ...sx }}>
      {/* [WIP] Role Filter //TODO: Enable
      <Card sx={{ mb: 2, mt: -2, display: 'flex' }}>
        <Stack direction="column" justifyContent="space-around">
          <Typography
            sx={{ fontSize: '0.9em', ml: 2, mr: 1, verticalAlign: 'middle' }}
            color="text.secondary"
          >
            Role:
          </Typography>
        </Stack>
        <FormControl sx={{ m: 1,  minWidth: 100 }} size="small">
          <Select
            labelId="role-filter-label"
            id="role-filter"
            value={selectedRole}
            displayEmpty
            onChange={(event: SelectChangeEvent) => {
              setSelectedRole(event.target.value);
            }}
          >
            <MenuItem value="">all</MenuItem>
            {game.roles.map((role: any) => (
              <MenuItem key={role.roleId} value={role.roleId} sx={{}}>
                {role.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Card> */}
      <SoulList souls={souls} roles={soulRoles} />
    </Box>
  );
}
