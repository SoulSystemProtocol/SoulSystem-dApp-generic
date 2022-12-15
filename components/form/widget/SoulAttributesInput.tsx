import {
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { WidgetProps } from '@rjsf/core';
import { PROFILE_TRAIT_TYPE } from 'constants/metadata';
import { PROFILE_TRAITS, Trait } from 'components/entity/soul/ProfileTraits';
import { useEffect, useState } from 'react';
import { MetadataAttribute } from 'helpers/metadata';
import _ from 'lodash';
import { capitalize } from 'lodash';
import { attributeHelper } from 'helpers/AttributeHelper';

/**
 * Form Widget: input Soul's attributes.
 */
export default function SoulAttributesInput(props: WidgetProps): JSX.Element {
  const propsAttributes = props.value;
  const propsOnChange = props.onChange;
  const [attributes, setAttributes] =
    useState<Array<MetadataAttribute>>(propsAttributes);

  useEffect(() => {
    console.log('Update Parent', attributes);
    // Update parent's data
    propsOnChange(attributes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attributes]);

  function onChange(event: any) {
    //Fetch Data
    const trait_type = event.target.name;
    const trait_value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;
    //** Update attributes
    let newAttr: MetadataAttribute = {
      trait_type,
      value: trait_value !== null ? trait_value : '',
    };

    console.log('New Attr: ', newAttr);
    // let newAttributes = attributeSet([...attributes], eventTargetName, newAttr);
    let newAttributes = attributeHelper.attributeSet([...attributes], newAttr);
    setAttributes(newAttributes);
  }

  if (!attributes) return <></>;
  return (
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
              value={attributeHelper.extractValue(
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
              value={attributeHelper.extractValue(
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
              value={attributeHelper.extractValue(
                attributes,
                PROFILE_TRAIT_TYPE.email,
              )}
              placeholder="email@site.com"
            />
            <TextField
              variant="outlined"
              onChange={onChange}
              label="A little bit about yourself"
              name={PROFILE_TRAIT_TYPE.description}
              disabled={props.disabled}
              value={attributeHelper.extractValue(
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
            {Object.keys(PROFILE_TRAITS).map((name: any, index: number) => {
              const item: Trait = PROFILE_TRAITS[name];
              return (
                <Grid key={name} item xs={12} sm={6}>
                  <TextField
                    sx={{ width: '100%' }}
                    variant="outlined"
                    onChange={onChange}
                    label={item.label}
                    name={name}
                    disabled={props.disabled}
                    value={attributeHelper.extractValue(attributes, item.label)}
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
              );
            })}
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid key={1} item xs={12} md={6}>
          <>
            <Grid key={'header'} item xs={12}>
              <Typography variant="h6">Custom Attributtes</Typography>
            </Grid>
            {attributes.map((attr: any, index: number) => {
              return Object.keys(PROFILE_TRAITS)
                .concat(['first name', 'last name', 'description', 'email']) //Exclusions
                .includes(attr?.trait_type?.toLowerCase()) ? null : (
                <Grid key={attr?.trait_type} item xs={12} sm={6}>
                  <CustomAttribute
                    key={attr.value}
                    item={attr}
                    attributes={attributes}
                    setAttributes={setAttributes}
                  />
                </Grid>
              );
            })}
          </>
        </Grid>
      </Grid>
    </Box>
  );
}

interface AttributeProps {
  item: MetadataAttribute;
  attributes: Array<MetadataAttribute>;
  setAttributes: (attributes: Array<MetadataAttribute>) => void;
}
export function CustomAttribute({
  item,
  attributes,
  setAttributes,
}: AttributeProps): JSX.Element {
  const [index, setIndex] = useState<number>();
  const [label, setLabel] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [type, setType] = useState<
    'boost_number' | 'boost_percentage' | 'number' | undefined
  >();

  const onChange = (event: any) => {
    console.warn('Handled onChange', event);
  };

  useEffect(() => {
    //Find Current Attribute Index (Before Change)
    setIndex();

    setLabel(item.trait_type);
    setValue(item.value);
    setType(item.display_type);
    console.log('Attr: ', { item, label, value, type });
  }, [item]);

  useEffect(() => {
    if (value) {
      //** Update attributes
      console.warn('Update Attr: ', { label, value, type });
      let newAttr: MetadataAttribute = {
        trait_type: label,
        value,
        display_type: type,
      };
      // newAttr.display_type = '';
      console.log('New Attr: ', newAttr);
      let newAttributes = attributeSet([...attributes], newAttr);
      setAttributes(newAttributes);
    } else {
      //Remove Attribute
      console.warn('Remove Attr: ', { label, value, type });
    }
  }, [label, value, type]);

  return (
    <Grid key={'name'} item xs={12} sm={6}>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={type || 'number'}
        label="Trait Type"
        onChange={(event) => setType(event?.target?.value)}
      >
        {['boost_number', 'boost_percentage', 'number'].map((name) => (
          <MenuItem key={name} value={name}>
            {capitalize(name)}
          </MenuItem>
        ))}
      </Select>
      <TextField
        sx={{ width: '100%' }}
        variant="outlined"
        onChange={onChange}
        label={label}
        name={value}
        value={value}
        placeholder={'placeholder'}
        type={'text'}
        // InputProps={{
        //   startAdornment: (
        //     <InputAdornment position="start">{item.icon}</InputAdornment>
        //   ),
        // }}
      />
      <label>{label}</label> :{value}
    </Grid>
  );
}
