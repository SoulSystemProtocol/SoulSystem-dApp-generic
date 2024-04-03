import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab, Typography } from '@mui/material';
import CTXParts from 'components/entity/game/CTXParts';
import { useState } from 'react';
import GameApplications from './dao/GameApplications';
import SoulAffiliations from 'components/entity/soul/SoulAffiliations';
import useError from 'hooks/useError';
import CTXRoleTokens from '../CTXRoleTokens';

/**
 * Tabs for Game type:mDAO
 */
export default function GameTabs({ item: game, sx }: any) {
  const [tabValue, setTabValue] = useState('1');
  const { handleError } = useError();

  if (!game) {
    handleError('Game Entity Missing', false);
    return <>...</>;
  }
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
          {/* <Tab label="Discussion" value="1" /> */}
          <Tab label="Relations" value="1" />
          <Tab label="Applicants" value="3" />
          <Tab label="Members" value="4" />
          <Tab label="Positions" value="5" />
        </TabList>
        {/* <TabPanel value="1" sx={{ p: 0 }}>
          <EntityPosts item={game} types={['post', 'comment']} />
        </TabPanel> */}
        <TabPanel value="1" sx={{ px: { xs: 0, sm: 2 } }}>
          <SoulAffiliations showServices={false} />
        </TabPanel>
        <TabPanel value="3" sx={{ px: { xs: 0, sm: 2 } }}>
          <GameApplications />
        </TabPanel>
        <TabPanel value="4" sx={{ px: 0 }}>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            These are the stewards of this contract who hold NFTs that represent
            their roles
          </Typography>
          <CTXParts />
        </TabPanel>
        <TabPanel value="5" sx={{ px: { xs: 0, sm: 2 } }}>
          <CTXRoleTokens ctx={game} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
