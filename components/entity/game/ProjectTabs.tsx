import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab, Typography } from '@mui/material';
import CTXParts from 'components/entity/game/CTXParts';
import { nameEntity } from 'helpers/utils';
import { useContext, useState } from 'react';
import ProjectAddTaskButton from 'components/entity/project/ProjectAddTaskButton';
import ProjectTaskList from 'components/entity/project/ProjectTaskList';
import CTXRoleTokens from '../CTXRoleTokens';
import { SelectedGameContext } from 'contexts/SelectedGame';
import RuleManage from 'components/rules/RuleManage';
import OpinionManage from 'components/rules/OpinionManage';

/**
 * Tabs for Game Type:'project'
 */
export default function ProjectTabs({ item: project, sx }: any) {
  const { game } = useContext(SelectedGameContext);
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
          <Tab label="Members" value="1" />
          <Tab label={nameEntity('task', true)} value="3" />
          <Tab label="Positions" value="5" />
          {process.env.NEXT_PUBLIC_FEATURE_RULES == 'true' && (
            <Tab label={nameEntity('rules', true)} value="6" />
          )}
        </TabList>
        {/* <TabPanel value="1" sx={{ px: { xs: 0, sm: 2 } }}>
          <EntityPosts item={project} />
        </TabPanel> */}
        <TabPanel value="1" sx={{ px: 0 }}>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            These are the stewards of this contract who hold NFTs that represent
            their roles
          </Typography>
          <CTXParts />
        </TabPanel>
        <TabPanel value="3" sx={{ px: { xs: 0, sm: 2 } }}>
          <ProjectAddTaskButton project={project} sx={{ mb: 4 }} />
          <ProjectTaskList />
        </TabPanel>
        <TabPanel value="5" sx={{ px: { xs: 0, sm: 2 } }}>
          <CTXRoleTokens ctx={game} />
        </TabPanel>
        <TabPanel value="6" sx={{ px: { xs: 0, sm: 2 } }}>
          <OpinionManage ctx={game} />

          <RuleManage ctx={game} />


        </TabPanel>
      </TabContext>
    </Box>
  );
}
