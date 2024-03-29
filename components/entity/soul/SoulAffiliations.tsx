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
export default function SoulAffiliations({
  showServices = true,
}: any): JSX.Element {
  const { soul } = useContext(SelectedSoulContext);

  return (
    <Box>
      {showServices && (
        <Box sx={{ my: 2 }}>
          <Typography variant="h4" sx={{ mb: 1 }}>
            {nameEntity('mdao', true)}
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
                // console.log('Parts Items', items);
                //Merge Participant Roles (SoulPartsQuery)
                let outputs: any = {};
                for (let item of items) {
                  //By Container
                  const elId = item.aEnd.id;
                  /* Role Names Only */
                  if (!outputs[elId]) {
                    outputs[elId] = {
                      id: item.id,
                      ent: item.aEnd,
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
          )}
        </Box>
      )}

      <Box sx={{ my: 2 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          {nameEntity('project', true)}
        </Typography>
        {soul?.id && (
          <SoulParts
            variables={{
              id: soul?.id,
              role: GAME_TYPE.project,
              stage: 0, //for consistency
            }}
            itemsProcessing={(items: any): CardItem[] => {
              // console.log('Parts Items', items);
              //Merge Participant Roles (SoulPartsQuery)
              let outputs: any = {};
              for (let item of items) {
                //By Container
                const elId = item.aEnd.id;
                if (!outputs[elId]) {
                  outputs[elId] = {
                    id: item.id,
                    ent: item.aEnd,
                    roles: [],
                  };
                }
                // Role Names Only
                outputs[elId].roles.push({ name: item.role, qty: item.qty });
              }
              return Object.values(outputs);
            }}
            getCardContent={soulPartCardContent}
          />
        )}
      </Box>

      {/* <Box sx={{ my: 2 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          {nameEntity('task', true)}
        </Typography>
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
                const elId = item.aEnd.id;
                // Role Names Only
                if (!outputs[elId]) {
                  outputs[elId] = {
                    id: item.id,
                    ent: item.aEnd,
                    roles: [],
                  };
                }
                //Add Role
                outputs[elId].roles.push({ name: item.role, qty: item.qty });
              }
              return Object.values(outputs);
            }}
            getCardContent={soulPartTaskCardContent}
          />
        )}
      </Box> */}
      <Box sx={{ my: 2 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>
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
                const elId = item.aEnd.id;
                /* Role Names Only */
                if (!outputs[elId]) {
                  outputs[elId] = {
                    id: item.id,
                    ent: item.aEnd,
                    roles: [],
                  };
                }
                //Add Role
                outputs[elId].roles.push({ name: item.role, qty: item.qty });
              }
              return Object.values(outputs);
            }}
            getCardContent={soulPartTaskCardContent}
          />
        )}
      </Box>

      <Box sx={{ my: 2 }}>
        {/* <Typography variant="h4" sx={{mb:1}}>{nameEntity('task', true)} Won</Typography> */}
        <Typography variant="h4" sx={{ mb: 1 }}>
          Verified Portfolio
        </Typography>
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
                const elId = item.aEnd.id;
                /* Role Names Only */
                if (!outputs[elId]) {
                  outputs[elId] = {
                    id: item.id,
                    ent: item.aEnd,
                    roles: [],
                  };
                }
                //Add Role
                outputs[elId].roles.push({ name: item.role, qty: item.qty });
              }
              return Object.values(outputs);
            }}
            getCardContent={soulPartTaskCardContent}
          />
        )}
      </Box>
    </Box>
  );
}
