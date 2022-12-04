import { Box } from '@mui/material';
import SoulList from 'components/entity/soul/SoulList';
import useError from 'hooks/useError';
import useSoulsById from 'hooks/useSoulsById';
import { nameRole } from 'hooks/utils';
import { union } from 'lodash';
import { useEffect, useState } from 'react';

/**
 * Display Game Members
 */
export default function GameMembers({ game, sx }: any) {
  const { handleError } = useError();
  const [soulIds, setSoulIds] = useState<Array<string>>([]);
  const { souls } = useSoulsById(soulIds, 24);
  const [soulRoles, setSoulRoles] = useState<Object | {}>({});

  async function loadData() {
    try {
      let allSouls: any[] = [];
      // let roleSouls: any = {};
      const roles: { [key: string]: Array<any> } = {};
      for (let i = 0; i < game.roles.length; i++) {
        allSouls = union(allSouls, game.roles[i].souls);
        // roleSouls[game.roles[i].name] = game.roles[i].souls;
        for (let j = 0; j < game.roles[i].souls.length; j++) {
          const soulId = game.roles[i].souls[j];
          if (!roles[soulId]) roles[soulId] = Array();
          roles[soulId].push(nameRole(game.roles[i].name, 'game'));
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

  useEffect(() => {
    game && loadData();
  }, [game]);

  if (!game) return <></>;
  return (
    <Box sx={{ sm: 12, ...sx }}>
      <SoulList souls={souls} roles={soulRoles} />
    </Box>
  );
}
