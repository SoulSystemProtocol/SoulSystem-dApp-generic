import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import CTXParts from 'components/entity/game/CTXParts';
import { nameEntity } from 'helpers/utils';
import { useState } from 'react';
import ProjectAddTaskButton from 'components/entity/project/ProjectAddTaskButton';
import ProjectTaskList from 'components/entity/project/ProjectTaskList';
import CTXRoles from '../CTXRoles';

/**
 * Tabs for Game Type:'project'
 */
export default function ProjectTabs({ item: project, sx }: any) {
  const [tabValue, setTabValue] = useState('1');

  return (
    <Box sx={{ width: '100%', ...sx }}>
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
          <Tab label="Role Tokens" value="5" />
        </TabList>
        {/* <TabPanel value="1" sx={{ px: { xs: 0, sm: 2 } }}>
          <EntityPosts item={project} />
        </TabPanel> */}
        <TabPanel value="1" sx={{ px: 0 }}>
          <ProjectAddTaskButton project={project} sx={{ mb: 4 }} />
          <ProjectTaskList />
        </TabPanel>
        <TabPanel value="3" sx={{ px: { xs: 0, sm: 2 } }}>
          <CTXParts />
        </TabPanel>
        <TabPanel value="5" sx={{ px: { xs: 0, sm: 2 } }}>
          <CTXRoles />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
