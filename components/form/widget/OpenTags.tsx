import { Autocomplete, Chip, FormControl, TextField } from '@mui/material';
import { WidgetProps } from '@rjsf/core';
import { ReactElement, useEffect, useState } from 'react';

/**
 * Tags Widget
 */
export default function OpenTags(props: WidgetProps): ReactElement {
  const propsRequired = props.required;
  const propsOnChange = props.onChange;
  const [value, setValue] = useState<Array<string>>(
    props.value[0] === undefined ? [] : props.value,
  );
  const options = (props.options?.options as string[]) || [];

  useEffect(() => {
    // Update data on parent (form)
    propsOnChange(value);
  }, [value]);

  return (
    <FormControl required={propsRequired} fullWidth>
      <Autocomplete
        multiple
        id="tags-field"
        options={options}
        value={value}
        freeSolo
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <Chip
                variant="filled"
                label={option}
                {...getTagProps({ index })}
              />
            );
          })
        }
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label={props.label} />
        )}
      />
    </FormControl>
  );
}
