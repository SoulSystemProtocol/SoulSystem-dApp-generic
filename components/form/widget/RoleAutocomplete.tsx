import { Autocomplete, FormControl, TextField } from '@mui/material';
import { WidgetProps } from '@rjsf/core';
import { ReactElement, useEffect, useState } from 'react';

/**
 * Form Widget: Role Autocomplete
 */
export default function RoleAutocomplete(props: WidgetProps): ReactElement {
  const propsRequired = props.required;
  const propsOnChange = props.onChange;
  const [value, setValue] = useState<string>(props?.value || '');
  const options = (props?.options?.options as string[]) || [];

  // console.warn('Options:', props?.options?.options);

  useEffect(() => {
    // Update data on parent (form)
    propsOnChange(value);
  }, [value]);

  return (
    <FormControl required={propsRequired} fullWidth>
      <Autocomplete
        id="role-autocomplete"
        options={options}
        value={value}
        freeSolo={true}
        onChange={(event, newValue) => {
          setValue(newValue || '');
        }}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              variant="outlined"
              label={props.label}
              // sx={{ textTransform: 'capitalize' }}
            />
          );
        }}
      />
    </FormControl>
  );
}
