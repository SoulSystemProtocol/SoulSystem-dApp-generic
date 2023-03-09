import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab, Typography } from '@mui/material';
import GameMembers from 'components/entity/game/GameMembers';
import EntityPosts from 'components/entity/post/EntityPosts';
import { useState } from 'react';
import GameApplications from './dao/GameApplications';
import SoulAffiliations from 'components/entity/soul/SoulAffiliations';
import useError from 'hooks/useError';

/**
 * Tabs for Game type:DAO
 */
export default function DaoTabs({ item: game, sx }: any) {
  const [tabValue, setTabValue] = useState('1');
  const { handleError } = useError();

  if (!game) {
    handleError('Game Entity Missing', false);
    return <>...</>;
  }
  return (
    <Box sx={{ width: '100%', ...sx }}>
      <Typography variant="h4" sx={{ mt: 4 }}>
        Announcements
      </Typography>
      <EntityPosts
        item={game}
        types={['post', 'comment']}
        sx={{ mb: 5, mt: 1 }}
      />
      <TabContext value={tabValue}>
        <TabList
          onChange={(_: any, newTabValue: any) => setTabValue(newTabValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            mb: 1,
            maxWidth: 'calc(100vw - 32px)',
          }}
        >
          {/* <Tab label="Discussion" value="1" /> */}
          <Tab label="Members" value="1" />
          <Tab label="Applicants" value="3" />
          <Tab label="Relations" value="4" />
        </TabList>
        {/* <TabPanel value="1" sx={{ p: 0 }}>
          <EntityPosts item={game} types={['post', 'comment']} />
        </TabPanel> */}
        <TabPanel value="1" sx={{ px: 0 }}>
          <GameMembers game={game} />
        </TabPanel>
        <TabPanel value="3" sx={{ px: 0 }}>
          <GameApplications />
        </TabPanel>
        <TabPanel value="4" sx={{ px: 0 }}>
          <SoulAffiliations />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
