import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import GameSouls from 'components/game/GameSouls';
import GameComments from 'components/game/GameComments';
import { useState } from 'react';
import DaoApplications from './DaoApplications';

/**
 * Component: DAO tabs.
 */
export default function DaoTabs({ item: dao, sx }: any) {
  const [tabValue, setTabValue] = useState('1');

  function handleChange(_: any, newTabValue: any) {
    setTabValue(newTabValue);
  }
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
            <Tab label="Posts" value="1" />
            <Tab label="Players" value="2" />
            <Tab label="Applicants" value="3" />
          </TabList>
          <TabPanel value="1" sx={{ px: 0 }}>
            <GameComments item={dao} />
          </TabPanel>
          <TabPanel value="2" sx={{ px: 0 }}>
            <GameSouls game={dao} />
          </TabPanel>
          <TabPanel value="3" sx={{ px: 0 }}>
            <DaoApplications dao={dao} />
          </TabPanel>
        </TabContext>
      </Box>
    );
  }

  return <></>;
}
