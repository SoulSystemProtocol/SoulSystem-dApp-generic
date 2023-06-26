import { Stack, Chip, Tooltip } from '@mui/material';
import { capitalize } from 'lodash';

export function SoulRoles({ roles, sx = {} }: any) {
  if (roles?.length > 0) {
    return (
      <Stack spacing={1} sx={{ ml: 1, alignSelf: 'center', ...sx }}>
        {roles.map((role: string | any, index: number) => (
          <Tooltip
            key={index}
            title={role?.qty ? 'X' + role.qty : ''}
            placement="top"
          >
            <Chip
              label={capitalize(role?.name || role)}
              size="small"
              sx={{ fontSize: '0.65em' }}
            />
          </Tooltip>
        ))}
      </Stack>
    );
  }
  return <></>;
}
