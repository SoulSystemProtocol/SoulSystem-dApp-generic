import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import Soul from 'classes/Soul';
import SoulList from 'components/soul/SoulList';
import { GAME_ROLE } from 'constants/contracts';
import useDao from 'hooks/useDao';
import useError from 'hooks/useError';
import useSoul from 'hooks/useSoul';
import { useEffect, useState } from 'react';

/**
 * A component with DAO tabs.
 */
export default function DaoTabs({ dao, sx }: any) {
  const { handleError } = useError();
  const { getSoulsByRole } = useDao();
  const { getSouls } = useSoul();
  const [tabValue, setTabValue] = useState('1');
  const [memberSouls, setMemberSouls] = useState<Array<Soul> | null>(null);
  const [adminSouls, setAdminSouls] = useState<Array<Soul> | null>(null);

  async function loadData() {
    try {
      const members = getSoulsByRole(dao, GAME_ROLE.member.id);
      const admins = getSoulsByRole(dao, GAME_ROLE.admin.id);
      setMemberSouls(await getSouls(members, undefined, 25, 0));
      setAdminSouls(await getSouls(admins, undefined, 25, 0));
    } catch (error: any) {
      handleError(error, true);
    }
  }

  function handleChange(_: any, newTabValue: any) {
    setTabValue(newTabValue);
  }

  useEffect(() => {
    if (dao) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dao]);

  if (dao) {
    return (
      <Box sx={{ width: '100%', ...sx }}>
        <TabContext value={tabValue}>
          <TabList
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              mb: 1,
              maxWidth: 'calc(100vw - 32px)',
            }}
          >
            <Tab label="Members" value="1" />
            <Tab label="Admins" value="2" />
          </TabList>
          <TabPanel value="1" sx={{ px: 0 }}>
            <SoulList souls={memberSouls} />
          </TabPanel>
          <TabPanel value="2" sx={{ px: 0 }}>
            <SoulList souls={adminSouls} />
          </TabPanel>
        </TabContext>
      </Box>
    );
  }

  return <></>;
}
