// import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import Soul from 'classes/Soul';
import SoulList from 'components/soul/SoulList';
import { GAME_ROLE } from 'constants/contracts';
import useDao from 'hooks/useDao';
import useError from 'hooks/useError';
import useSoul from 'hooks/useSoul';
import { useEffect, useState } from 'react';
// import DaoApplications from './DaoApplications';

/**
 * A component with DAO tabs.
 */
export default function GameMembers({ game: dao, sx }: any) {
  const { handleError } = useError();
  const { getSoulsByRole } = useDao();
  const { getSouls } = useSoul();
  const [memberSouls, setMemberSouls] = useState<Array<Soul>>([]);
  const [roles, setRoles] = useState<Object | {}>({});

  async function loadData() {
    try {
      const member = getSoulsByRole(dao, GAME_ROLE.member.id);
      const admin = getSoulsByRole(dao, GAME_ROLE.admin.id);
      const authority = getSoulsByRole(dao, GAME_ROLE.authority.id);
      const applicant = getSoulsByRole(dao, GAME_ROLE.applicant.id);
      const all = _.union(member, admin, authority, applicant);
      //Fetch All Souls
      setMemberSouls(await getSouls(all, undefined, 25, 0));
      //Index Roles by Soul ID
      const roles: Object = {};
      _.each({ member, admin, authority, applicant }, function (values, key) {
        _.each(values, function (value) {
          if (!roles[value]) roles[value] = Array();
          roles[value].push(key);
        });
      });
      setRoles(roles);
    } catch (error: any) {
      handleError(error, true);
    }
  }

  useEffect(() => {
    if (dao) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dao]);

  if (dao) {
    return (
      <Box sx={{ sm: 12, ...sx }}>
        <SoulList souls={memberSouls} roles={roles} />
      </Box>
    );
  }

  return <></>;
}
