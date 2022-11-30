import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import GameSouls from 'components/entity/game/GameSouls';
import EntityComments from 'components/entity/EntityComments';
import { useState } from 'react';
import DaoApplications from './DaoApplications';
import SoulAffiliations from 'components/entity/soul/SoulAffiliations';

/**
 * DAO tabs
 */
export default function DaoTabs({ item: dao, sx }: any) {
  const [tabValue, setTabValue] = useState('1');

  function handleChange(_: any, newTabValue: any) {
    setTabValue(newTabValue);
  }

  if (!dao) return <></>;
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
          <Tab label="Posts" value="1" />
          <Tab label="Members" value="2" />
          <Tab label="Applicants" value="3" />
          <Tab label="Relations" value="4" />
        </TabList>
        <TabPanel value="1" sx={{ p: 0 }}>
          <EntityComments item={dao} />
        </TabPanel>
        <TabPanel value="2" sx={{ px: 0 }}>
          <GameSouls game={dao} />
        </TabPanel>
        <TabPanel value="3" sx={{ px: 0 }}>
          <DaoApplications dao={dao} />
        </TabPanel>
        <TabPanel value="4" sx={{ px: 0 }}>
          <SoulAffiliations />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
