import { Stack, Chip } from '@mui/material';
import { capitalize } from 'lodash';

export function SoulRoles({ roles }: any) {
  if (roles?.length > 0) {
    return (
      <Stack spacing={1}>
        {roles.map((role: string, index: number) => (
          <Chip key={index} label={capitalize(role)} size="small" />
        ))}
      </Stack>
    );
  }
  return <></>;
}
