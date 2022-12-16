import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
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
import { useContext, useEffect, useState } from 'react';
import { MetadataAttribute, MetadataAttributeType } from 'helpers/metadata';
import _ from 'lodash';
import { capitalize } from 'lodash';
import { attributeHelper } from 'helpers/AttributeHelper';
import { DialogContext, TDialogContext } from 'contexts/dialog';
import AttributeAddDialog from 'components/entity/soul/AttributeAddDialog';
import AttributeDisplayPercentage from 'components/entity/soul/AttributeDisplayPercentage';

interface AttributeProps {
  item: MetadataAttribute;
  setAttribute: (attribute: MetadataAttribute) => void;
  removeAttribute: () => void;
}

/**
 * Form Widget: input Soul's attributes.
 */
export default function SoulAttributesInput(props: WidgetProps): JSX.Element {
  const propsAttributes = props.value;
  const propsOnChange = props.onChange;
  const { showDialog, closeDialog }: Partial<TDialogContext> =
    useContext(DialogContext);
  const [attributes, setAttributes] =
    useState<Array<MetadataAttribute>>(propsAttributes); //attributeHelper.sort(propsAttributes), // What for?

  // const [attributesObj, setAttributesObj] = useState<any>();

  useEffect(() => {
    // Update parent's data
    propsOnChange(attributes);
    /*
    let newAttributeObj: any = {};
    for (let i in attributes) {
      if (attributes[i].trait_type) {
        const traitType = attributes[i].trait_type.toLowerCase();
        if (!(traitType in newAttributeObj)) newAttributeObj[traitType] = {};
        newAttributeObj[traitType][attributes[i].trait_type] = attributes[i];
      }
    }
    console.warn('Workable Attribute Object:', newAttributeObj);
    setAttributesObj(newAttributeObj);
    */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attributes]);

  /* [CANCELLED]
  const updateAttributes = (key: string, attr: MetadataAttribute) => {
    setAttributesObj({ ...attributesObj, [key]: attr });
    console.warn('Update Attributes Object', { ...attributesObj, [key]: attr });
  };
  * /

  /**
   *
   * /
  const singleAttrChanage = (index: number, attr: MetadataAttribute) => {
    console.log(
      'SoulAttributesInput.singleAttrChanage() Attr Change I:' + index,
      {
        attr,
        current: attributes[index],
      },
    );
    setAttributes(Object.assign([], attributes, { [index]: attr }));
  };

  /**
   *
   */
  const onChange = (event: any) => {
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
    let newAttributes = attributeHelper.attributeSet([...attributes], newAttr);
    console.log('New Attr: ', newAttr, newAttributes);
    setAttributes(newAttributes);
  };

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
        <Grid key={1} item xs={12}>
          <>
            <Grid key={'header'} item xs={12}>
              <Typography variant="h6">Skills</Typography>
            </Grid>
            {attributes.map((item: MetadataAttribute, index: number) => {
              return item.display_type != 'boost_percentage' ? null : (
                <Grid key={item.trait_type} item xs={12} sm={6}>
                  <AttributeDisplayPercentage item={item} />
                </Grid>
              );
            })}
            <Button
              variant="outlined"
              onClick={() =>
                showDialog?.(
                  <AttributeAddDialog
                    onClose={closeDialog}
                    onSubmit={(data: any) => {
                      console.warn('AttributeAddDialog Submit', data);
                      setAttributes((attributes) => [...attributes, data]);
                    }}
                    title="Add Skill"
                  />,
                )
              }
            >
              +
            </Button>
          </>
        </Grid>
      </Grid>
    </Box>
  );
}

/** [UNUSED]
 *
 */
export function CustomAttribute({
  item,
  setAttribute,
  removeAttribute,
}: AttributeProps): JSX.Element {
  const [label, setLabel] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [type, setType] = useState<MetadataAttributeType | undefined>();

  const onChange = (event: any) => {
    console.warn('Handled onChange', event);
  };

  useEffect(() => {
    setLabel(item.trait_type);
    setValue(item.value);
    setType(item.display_type);
    console.warn('Attr Updated Externally: ', { item, label, value, type });
  }, [item]);

  useEffect(() => {
    //** Update attributes
    const newAttr: MetadataAttribute = {
      trait_type: label,
      value,
      display_type: type,
    };
    console.warn('CustomAttribute() Update Attr: ', {
      label,
      value,
      type,
      newAttr,
    });
    // newAttr.display_type = '';
    console.log('CustomAttribute() New Attr: ', newAttr);
    setAttribute(newAttr);
  }, [label, value, type]);

  return (
    <Grid key={'name'} item xs={12}>
      <Box component="form" noValidate autoComplete="off">
        <Stack direction={{ xs: 'column', sm: 'row' }}>
          {type == 'boost_percentage' && (
            <AttributeDisplayPercentage item={item} />
          )}
          <FormControl variant="standard">
            <InputLabel htmlFor="component-simple">Type</InputLabel>
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
          </FormControl>
          <FormControl variant="standard">
            <InputLabel htmlFor="component-simple">Label</InputLabel>
            <TextField
              disabled={true}
              sx={{ flex: 1 }}
              variant="outlined"
              onChange={(event) => setLabel(event.target.value)}
              label={label}
              name="label"
              value={label}
            />
          </FormControl>
          <FormControl variant="standard">
            <InputLabel htmlFor="component-simple">Value</InputLabel>

            <TextField
              sx={{ flex: 1 }}
              variant="outlined"
              onChange={(event) => setValue(event.target.value)}
              label={label}
              name="value"
              value={value}
              // InputProps={{
              //   endAdornment: (
              //     <Button
              //       onClick={() => removeAttribute()}
              //       sx={{
              //         color: 'red',
              //         margin: '0px !important',
              //         padding: '0px !important',
              //       }}
              //     >
              //       <DeleteForeverIcon />
              //     </Button>
              //   ),
              // }}
            />
          </FormControl>
          <Button
            onClick={() => removeAttribute()}
            sx={{
              color: 'red',
              margin: '0px !important',
              padding: '0px !important',
            }}
          >
            <DeleteForeverIcon />
          </Button>
        </Stack>
      </Box>
    </Grid>
  );
}
