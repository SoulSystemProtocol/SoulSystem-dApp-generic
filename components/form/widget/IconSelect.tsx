import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';

/**
 * A widget to select icon (name).
 */
export default function IconSelect(props: any): JSX.Element {
  const propsLabel = props.label;
  const propsRequired = props.required;
  const propsValue = props.value;
  const propsOnChange = props.onChange;
  const [value, setValue] = useState('');

  useEffect(() => {
    if (propsValue) {
      setValue(propsValue);
    } else {
      setValue('Default');
      propsOnChange('Default');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <FormControl required={propsRequired} fullWidth>
        <InputLabel id="icon-select-label">{propsLabel || 'Icon'}</InputLabel>
        <Select
          labelId="icon-select-label"
          id="icon-select"
          value={value}
          label={propsLabel || 'Icon'}
          onChange={(event) => {
            setValue(event.target.value);
            propsOnChange(event.target.value);
          }}
          disabled={value === ''}
        >
          {/* {Object.values(ICON).map((icon, index) => (
            <MenuItem key={index} value={icon.name}>
              <Stack direction="row" alignItems="center" spacing={2}>
                {icon.icon(48)}
                <Typography>{icon.name}</Typography>
              </Stack>
            </MenuItem>
          ))} */}
        </Select>
      </FormControl>
    </Box>
  );
}
