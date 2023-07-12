import { Box, Card, Divider, MenuItem, Stack, Typography } from '@mui/material';
import { ReactElement, useContext, useEffect, useState } from 'react';
// import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import InputLabel from '@mui/material/InputLabel';
import SoulMembersOf from '../soul/SoulMembersOf';
import { CardItem, soulPartCardContent } from 'utils/cardContents';
import { SelectedSoulContext } from 'contexts/SelectedSoul';

/**
 * Display Game Members (CTX Parts)
 */
export default function CTXParts({ sx }: any): ReactElement {
  // const { handleError } = useError();

  const { soul } = useContext(SelectedSoulContext);

  if (!soul) return <></>;
  return (
    <Box sx={{ sm: 12, ...sx }}>
      {/* [WIP] Role Filter //TODO: Enable
      <Card sx={{ mb: 2, mt: -2, display: 'flex' }}>
        <Stack direction="column" justifyContent="space-around">
          <Typography
            sx={{ fontSize: '0.9em', ml: 2, mr: 1, verticalAlign: 'middle' }}
            color="text.secondary"
          >
            Role:
          </Typography>
        </Stack>
        <FormControl sx={{ m: 1,  minWidth: 100 }} size="small">
          <Select
            labelId="role-filter-label"
            id="role-filter"
            value={selectedRole}
            displayEmpty
            onChange={(event: SelectChangeEvent) => {
              setSelectedRole(event.target.value);
            }}
          >
            <MenuItem value="">all</MenuItem>
            {game.roles.map((role: any) => (
              <MenuItem key={role.roleId} value={role.roleId} sx={{}}>
                {role.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Card> */}
      <Box sx={{ my: 2 }}>
        <SoulMembersOf
          variables={{
            id: soul.id,
            type: '',
          }}
          itemsProcessing={(items: any[]): CardItem[] => {
            // console.log('SoulMembersOf', { items, soul });
            if (!items) return [];
            //Merge Participant Roles (SoulMembersOfQuery)
            let outputs: any = {};
            for (let item of items) {
              //By Container
              const elId = item.bEnd.id;
              /* Role Names Only */
              if (!outputs[elId]) {
                outputs[elId] = {
                  id: item.id,
                  ent: item.bEnd,
                  roles: [],
                };
              }
              //Add Role
              outputs[elId].roles.push({ name: item.role, qty: item.qty });
            }
            return Object.values(outputs);
          }}
          getCardContent={soulPartCardContent}
        />
      </Box>
    </Box>
  );
}
