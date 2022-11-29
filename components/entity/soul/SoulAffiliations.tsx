import { Box, Typography } from '@mui/material';
import { GAME_TYPE } from 'constants/contracts';
import { SelectedSoulContext } from 'contexts/SelectedSoul';
import { nameEntity } from 'hooks/utils';
import { useContext } from 'react';
import {
  CardItem,
  soulPartCardContent,
  taskPartCardContent,
} from 'utils/cardContents';
import SoulParts from './SoulParts';
import SoulProcs from './SoulProcs';

/**
 * Soul's Connections to other protocol entities
 */
export default function SoulAffiliations(): JSX.Element {
  const { soul } = useContext(SelectedSoulContext);

  console.log('Loaded Soul', soul);
  return (
    <>
      <Box sx={{ my: 2 }}>
        <Typography variant="h4">
          Member of {nameEntity('mdao', true)}
        </Typography>
        {soul?.id && (
          <SoulParts
            variables={{
              id: soul?.id,
              role: GAME_TYPE.mdao,
            }}
            itemsProcessing={(items: any): CardItem[] => {
              console.log('Parts Items', items);
              //Merge Participant Roles (SoulPartsQuery)
              let outputs: any = {};
              for (let item of items) {
                //By Container
                let elId = item.aEnd.id;
                /* Role Names Only */
                if (!outputs[elId]) {
                  outputs[elId] = {
                    id: item.id,
                    aEnd: item.aEnd,
                    roles: [],
                  };
                }
                //Add Role
                outputs[elId].roles.push(item.role);
              }
              return Object.values(outputs);
            }}
            getCardContent={soulPartCardContent}
          />
        )}
      </Box>

      <Box sx={{ my: 2 }}>
        <Typography variant="h4">
          Works on {nameEntity('project', true)}
        </Typography>
        {soul?.id && (
          <SoulParts
            variables={{
              id: soul?.id,
              role: GAME_TYPE.project,
            }}
            itemsProcessing={(items: any): CardItem[] => {
              //Merge Participant Roles (SoulPartsQuery)
              let outputs: any = {};
              for (let item of items) {
                //By Container
                let elId = item.aEnd.id;
                /* Role Names Only */
                if (!outputs[elId]) {
                  outputs[elId] = {
                    id: item.id,
                    aEnd: item.aEnd,
                    roles: [],
                  };
                }
                //Add Role
                outputs[elId].roles.push(item.role);
              }
              return Object.values(outputs);
            }}
            getCardContent={soulPartCardContent}
          />
        )}
      </Box>

      <Box sx={{ my: 2 }}>
        <Typography variant="h4">{nameEntity('task', true)}</Typography>
        {soul?.id && (
          <SoulParts
            variables={{
              id: soul?.id,
              role: GAME_TYPE.task,
            }}
            itemsProcessing={(items: any): CardItem[] => {
              //Merge Participant Roles (SoulPartsQuery)
              let outputs: any = {};
              for (let item of items) {
                //By Container
                let elId = item.aEnd.id;
                /* Role Names Only */
                if (!outputs[elId]) {
                  outputs[elId] = {
                    id: item.id,
                    aEnd: item.aEnd,
                    roles: [],
                  };
                }
                //Add Role
                outputs[elId].roles.push(item.role);
              }
              return Object.values(outputs);
            }}
            getCardContent={soulPartCardContent}
          />
        )}
      </Box>
    </>
  );
}
