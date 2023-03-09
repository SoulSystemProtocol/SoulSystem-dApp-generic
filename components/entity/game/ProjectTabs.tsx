import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab, Typography } from '@mui/material';
import EntityPosts from 'components/entity/post/EntityPosts';
import GameMembers from 'components/entity/game/GameMembers';
import { nameEntity } from 'helpers/utils';
import { useState } from 'react';
import ProjectAddTaskButton from '../../project/ProjectAddTaskButton';
import ProjectTaskList from '../../project/ProjectTaskList';

/**
 * Project tabs
 */
export default function ProjectTabs({ item: project, sx }: any) {
  const [tabValue, setTabValue] = useState('1');

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <Typography variant="h4" sx={{ mt: 4 }}>
        Announcements
      </Typography>
      <EntityPosts item={project} sx={{ mb: 5, mt: 1 }} />
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
          {/* <Tab label="Announcements" value="1" /> */}
          <Tab label={nameEntity('task', true)} value="1" />
          <Tab label="Members" value="3" />
        </TabList>
        {/* <TabPanel value="1" sx={{ px: 0 }}>
          <EntityPosts item={project} />
        </TabPanel> */}
        <TabPanel value="1" sx={{ px: 0 }}>
          <ProjectAddTaskButton project={project} sx={{ mb: 4 }} />
          <ProjectTaskList />
        </TabPanel>
        <TabPanel value="3" sx={{ px: 0 }}>
          <GameMembers game={project} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
