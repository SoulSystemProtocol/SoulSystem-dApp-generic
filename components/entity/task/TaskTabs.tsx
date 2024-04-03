import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Stack, Tab, Typography } from '@mui/material';
import EntityComments from 'components/entity/post/EntityPosts';
import CTXParts from 'components/entity/game/CTXParts';
import { useState } from 'react';
// import TaskAcceptedApplications from './TaskAcceptedApplications';
import TaskApplications from './TaskApplications';
import TaskApprovedDeliveries from './TaskApprovedDeliveries';
import TaskPostedDeliveries from '../post/TaskPostedDeliveries';
import CTXRoleTokens from '../CTXRoleTokens';

/**
 * Task tabs
 */
export default function ProjectTabs({ item, sx }: any) {
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
          <Tab label="Deliveries" value="1" />
          <Tab label="Discussion" value="2" />
          <Tab label="Members" value="3" />
          <Tab label="Positions" value="5" />
        </TabList>
        <TabPanel value="1" sx={{ px: 0 }}>
          <Stack
            direction="column"
            spacing={2}
          // divider={<Divider sx={{ my: 4 }} />}
          >
            {item && <TaskApplications task={item} sx={{ mt: 2 }} />}
            {/* {item && <TaskAcceptedApplications task={item} sx={{ mt: 2 }} />} */}
            {item && <TaskPostedDeliveries task={item} sx={{ mt: 2 }} />}
            {item && <TaskApprovedDeliveries task={item} sx={{ mt: 2 }} />}
          </Stack>
        </TabPanel>
        <TabPanel value="2" sx={{ px: 0 }}>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Here participants can discuss the project, publically and immutably
          </Typography>
          <EntityComments item={item} />
        </TabPanel>
        <TabPanel value="3" sx={{ px: 0 }}>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            These are the stewards of this contract who hold NFTs that represent
            their roles
          </Typography>
          <CTXParts />
        </TabPanel>
        <TabPanel value="5" sx={{ px: { xs: 0, sm: 2 } }}>
          <CTXRoleTokens ctx={item} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
