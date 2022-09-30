import {
  FacebookRounded,
  Instagram,
  Language,
  Telegram,
  Twitter,
} from '@mui/icons-material';
import { InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { WidgetProps } from '@rjsf/core';
import { PROFILE_TRAIT_TYPE } from 'constants/metadata';
import { useEffect, useState } from 'react';
import { getTraitValue } from 'utils/metadata';

/**
 * A widget to input an soul attributes.
 */
export default function SoulAttributesInput(props: WidgetProps) {
  const propsDisabled = props.disabled;
  const propsAttributes = props.value;
  const propsOnChange = props.onChange;
  const [attributes, setAttributes] = useState<Array<object> | null>(null);

  function onChange(event: any) {
    // Define event params
    const eventTargetName = event.target.name;
    const eventTargetValue =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;
    // Update state of attributes
    if (attributes) {
      setAttributes(
        attributes.map((attribute: any) => {
          if (attribute.trait_type === eventTargetName) {
            return {
              trait_type: attribute.trait_type,
              value: eventTargetValue !== null ? eventTargetValue : '',
            };
          } else {
            return attribute;
          }
        }),
      );
    }
  }

  useEffect(() => {
    // Init attributes using parent's props or default values
    const attributes = Object.values(PROFILE_TRAIT_TYPE).map((traitType) => {
      return {
        trait_type: traitType,
        value: getTraitValue(propsAttributes, traitType) || '',
      };
    });
    setAttributes(attributes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Update parent's props
    propsOnChange(attributes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attributes]);

  return (
    <>
      {attributes ? (
        <>
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Public Data
            </Typography>
            <Stack spacing={2}>
              <TextField
                variant="outlined"
                onChange={onChange}
                label="First Name"
                name={PROFILE_TRAIT_TYPE.firstName}
                disabled={propsDisabled}
                value={
                  getTraitValue(attributes, PROFILE_TRAIT_TYPE.firstName) || ''
                }
                required
              />
              <TextField
                variant="outlined"
                onChange={onChange}
                label="Last Name"
                name={PROFILE_TRAIT_TYPE.lastName}
                disabled={propsDisabled}
                value={
                  getTraitValue(attributes, PROFILE_TRAIT_TYPE.lastName) || ''
                }
                required
              />
              <TextField
                variant="outlined"
                onChange={onChange}
                label="A little bit about yourself"
                name={PROFILE_TRAIT_TYPE.description}
                disabled={propsDisabled}
                value={
                  getTraitValue(attributes, PROFILE_TRAIT_TYPE.description) ||
                  ''
                }
                multiline
                rows={4}
              />
              <TextField
                variant="outlined"
                onChange={onChange}
                label="Email"
                name={PROFILE_TRAIT_TYPE.email}
                disabled={propsDisabled}
                value={
                  getTraitValue(attributes, PROFILE_TRAIT_TYPE.email) || ''
                }
                placeholder="email@site.com"
              />
            </Stack>
          </Box>
          <Box sx={{ mt: 6, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Links
            </Typography>
            <Stack spacing={2}>
              <TextField
                variant="outlined"
                onChange={onChange}
                label="Site"
                name={PROFILE_TRAIT_TYPE.site}
                disabled={propsDisabled}
                value={getTraitValue(attributes, PROFILE_TRAIT_TYPE.site) || ''}
                placeholder="https://site.com"
                type="url"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Language color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                variant="outlined"
                onChange={onChange}
                label="Twitter"
                name={PROFILE_TRAIT_TYPE.twitter}
                disabled={propsDisabled}
                value={
                  getTraitValue(attributes, PROFILE_TRAIT_TYPE.twitter) || ''
                }
                placeholder="username"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Twitter color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                variant="outlined"
                onChange={onChange}
                label="Telegram"
                name={PROFILE_TRAIT_TYPE.telegram}
                disabled={propsDisabled}
                value={
                  getTraitValue(attributes, PROFILE_TRAIT_TYPE.telegram) || ''
                }
                placeholder="username"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Telegram color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                variant="outlined"
                onChange={onChange}
                label="Facebook"
                name={PROFILE_TRAIT_TYPE.facebook}
                disabled={propsDisabled}
                value={
                  getTraitValue(attributes, PROFILE_TRAIT_TYPE.facebook) || ''
                }
                placeholder="username"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FacebookRounded color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                variant="outlined"
                onChange={onChange}
                label="Instagram"
                name={PROFILE_TRAIT_TYPE.instagram}
                disabled={propsDisabled}
                value={
                  getTraitValue(attributes, PROFILE_TRAIT_TYPE.instagram) || ''
                }
                placeholder="username"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Instagram color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
          </Box>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
