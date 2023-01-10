import { Box, Typography } from '@mui/material';
import { GAME_TYPE } from 'constants/contracts';
import { SelectedSoulContext } from 'contexts/SelectedSoul';
import { nameEntity } from 'helpers/utils';
import { useContext } from 'react';
import {
  CardItem,
  soulPartCardContent,
  soulPartTaskCardContent,
} from 'utils/cardContents';
import SoulParts from './SoulParts';

/**
 * Soul's Connections to other protocol entities
 */
export default function SoulAffiliations(): JSX.Element {
  const { soul } = useContext(SelectedSoulContext);

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
              stage: 0, //for consistency
              // type: 'GAME',
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

      {/* <Box sx={{ my: 2 }}>
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
                // Role Names Only
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
      </Box> */}

      <Box sx={{ my: 2 }}>
        <Typography variant="h4">{nameEntity('task', true)} Applied</Typography>
        {soul?.id && (
          <SoulParts
            gridLG={6}
            variables={{
              id: soul?.id,
              role: GAME_TYPE.task,
              stage: 1,
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
            getCardContent={soulPartTaskCardContent}
          />
        )}
      </Box>
      <Box sx={{ my: 2 }}>
        <Typography variant="h4">
          {nameEntity('task', true)} in Progress
        </Typography>
        {soul?.id && (
          <SoulParts
            gridLG={6}
            variables={{
              id: soul?.id,
              role: GAME_TYPE.task,
              stage: 3,
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
            getCardContent={soulPartTaskCardContent}
          />
        )}
      </Box>

      <Box sx={{ my: 2 }}>
        {/* <Typography variant="h4">{nameEntity('task', true)} Won</Typography> */}
        <Typography variant="h4">Verified Portfolio</Typography>
        {soul?.id && (
          <SoulParts
            gridLG={6}
            variables={{
              id: soul?.id,
              role: GAME_TYPE.task,
              stage: 6,
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
            getCardContent={soulPartTaskCardContent}
          />
        )}
      </Box>
    </>
  );
}
