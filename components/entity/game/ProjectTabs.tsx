import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import EntityComments from 'components/entity/EntityComments';
import GameMembers from 'components/entity/game/GameMembers';
import { nameEntity } from 'hooks/utils';
import { useState } from 'react';
import ProjectAddTaskButton from '../../project/ProjectAddTaskButton';
import ProjectTaskList from '../../project/ProjectTaskList';

/**
 * Project tabs
 */
export default function ProjectTabs({ item: project, sx }: any) {
  const [tabValue, setTabValue] = useState('1');

  function handleChange(_: any, newTabValue: any) {
    setTabValue(newTabValue);
  }

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
          <Tab label="Anouncments" value="1" />
          <Tab label={nameEntity('task', true)} value="2" />
          <Tab label="Members" value="3" />
        </TabList>
        <TabPanel value="1" sx={{ px: 0 }}>
          <EntityComments item={project} />
        </TabPanel>
        <TabPanel value="2" sx={{ px: 0 }}>
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
