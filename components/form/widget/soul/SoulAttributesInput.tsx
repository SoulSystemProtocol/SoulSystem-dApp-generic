import {
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { WidgetProps } from '@rjsf/core';
import { PROFILE_TRAIT_TYPE } from 'constants/metadata';
import { PROFILE_TRAITS } from 'components/soul/ProfileTraits';
import { useEffect, useState } from 'react';
import { getAttribute, attributeSet } from 'helpers/metadata';
import _ from 'lodash';

/**
 * Form Widget: input Soul's attributes.
 */
export default function SoulAttributesInput(props: WidgetProps): JSX.Element {
  const propsAttributes = props.value;
  const propsOnChange = props.onChange;
  const [attributes, setAttributes] = useState<Array<object>>(propsAttributes);

  function onChange(event: any) {
    //Fetch Data
    const eventTargetName = event.target.name;
    const eventTargetValue =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;
    //** Update attributes
    let newAttr = {
      trait_type: eventTargetName,
      value: eventTargetValue !== null ? eventTargetValue : '',
    };
    let newAttributes = attributeSet([...attributes], eventTargetName, newAttr);
    setAttributes(newAttributes);
  }

  useEffect(() => {
    // console.log('Update Parent', attributes);
    // Update parent's data
    propsOnChange(attributes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attributes]);

  return (
    <>
      {attributes ? (
        <>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid key={1} item xs={12} md={6}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  General Info (Public)
                </Typography>
                <Stack spacing={2}>
                  <TextField
                    variant="outlined"
                    onChange={onChange}
                    label="First Name"
                    name={PROFILE_TRAIT_TYPE.firstName}
                    disabled={props.disabled}
                    value={getAttribute(
                      attributes,
                      PROFILE_TRAIT_TYPE.firstName,
                    )}
                    required
                  />
                  <TextField
                    variant="outlined"
                    onChange={onChange}
                    label="Last Name"
                    name={PROFILE_TRAIT_TYPE.lastName}
                    disabled={props.disabled}
                    value={getAttribute(
                      attributes,
                      PROFILE_TRAIT_TYPE.lastName,
                    )}
                    required
                  />
                  <TextField
                    variant="outlined"
                    onChange={onChange}
                    label="Email"
                    name={PROFILE_TRAIT_TYPE.email}
                    disabled={props.disabled}
                    value={getAttribute(attributes, PROFILE_TRAIT_TYPE.email)}
                    placeholder="email@site.com"
                  />
                  <TextField
                    variant="outlined"
                    onChange={onChange}
                    label="A little bit about yourself"
                    name={PROFILE_TRAIT_TYPE.description}
                    disabled={props.disabled}
                    value={getAttribute(
                      attributes,
                      PROFILE_TRAIT_TYPE.description,
                    )}
                    multiline
                    rows={4}
                  />
                </Stack>
              </Grid>
              <Grid key={2} item xs={12} md={6}>
                <Grid container spacing={2}>
                  <Grid key={'header'} item xs={12}>
                    <Typography variant="h6">Socials</Typography>
                  </Grid>
                  {PROFILE_TRAITS.map((item: any, index: number) => (
                    <Grid key={index.toString()} item xs={12} sm={6}>
                      <TextField
                        sx={{ width: '100%' }}
                        variant="outlined"
                        onChange={onChange}
                        label={item.label}
                        name={item.label}
                        disabled={props.disabled}
                        value={getAttribute(attributes, item.label)}
                        placeholder={item.placeholder}
                        type={item.type}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              {item.icon}
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
