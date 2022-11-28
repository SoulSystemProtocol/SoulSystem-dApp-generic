import { Box } from '@mui/material';
import Soul from 'classes/Soul';
import SoulList from 'components/entity/soul/SoulList';
import { GAME_ROLE, SOUL_TYPE } from 'constants/contracts';
import useError from 'hooks/useError';
import useSoul from 'hooks/useSoul';
import { getSoulsByRole } from 'hooks/utils';
import { each, union } from 'lodash';
import { useEffect, useState } from 'react';

/**
 * Component: game members.
 */
export default function GameSouls({ game, sx }: any) {
  const { handleError } = useError();
  const { getSouls } = useSoul();
  const [souls, setSouls] = useState<Array<Soul> | null>(null);
  const [soulRoles, setSoulRoles] = useState<Object | {}>({});

  async function loadData() {
    try {
      // Load soul ids
      const members = getSoulsByRole(game, 'member');
      const admins = getSoulsByRole(game, 'admin');
      const authorities = getSoulsByRole(game, 'authority');
      const applicants = getSoulsByRole(game, 'applicant');
      const allSouls = union(members, admins, authorities, applicants);
      // Load souls by ids
      setSouls(
        await getSouls(
          allSouls,
          undefined,
          SOUL_TYPE.created_by_not_contract,
          25,
          0,
        ),
      );
      // Define roles for each soul
      const roles: { [key: string]: Array<any> } = {};
      each(
        {
          [GAME_ROLE.member.id]: members,
          [GAME_ROLE.admin.id]: admins,
          [GAME_ROLE.authority.id]: authorities,
          [GAME_ROLE.applicant.id]: applicants,
        },
        (roleSouls, roleId) => {
          each(roleSouls, (soul: string) => {
            if (!roles[soul]) roles[soul] = Array();
            roles[soul].push(roleId);
          });
        },
      );
      setSoulRoles(roles);
    } catch (error: any) {
      handleError(error, true);
    }
  }

  useEffect(() => {
    if (game) loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game]);

  if (game) {
    return (
      <Box sx={{ sm: 12, ...sx }}>
        <SoulList souls={souls} roles={soulRoles} />
      </Box>
    );
  }

  return <></>;
}
