import { Stack, Chip } from '@mui/material';
import { capitalize } from 'lodash';

export function SoulRoles({ roles, sx = {} }: any) {
  if (roles?.length > 0) {
    return (
      <Stack spacing={1} sx={{ ml: 1, alignSelf: 'flex-start', ...sx }}>
        {roles.map((role: string, index: number) => (
          <Chip key={index} label={capitalize(role)} size="small" />
        ))}
      </Stack>
    );
  }
  return <></>;
}