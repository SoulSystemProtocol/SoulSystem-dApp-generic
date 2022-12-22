import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
  Button,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { WidgetProps } from '@rjsf/core';
import { PROFILE_TRAIT_TYPE } from 'constants/metadata';
import {
  GAME_PROFILE_TRAITS,
  PROFILE_TRAITS,
  Trait,
  USER_PROFILE_TRAITS,
} from 'components/entity/soul/ProfileTraits';
import { ReactElement, useContext, useEffect, useState } from 'react';
import { MetadataAttribute } from 'helpers/metadata';
import _ from 'lodash';
import { MetaAttrHelper } from 'helpers/MetaAttrHelper';
import { DialogContext, TDialogContext } from 'contexts/dialog';
import AttributeAddDialog from 'components/entity/soul/AttributeAddDialog';
import AttributeDisplayPercentage from 'components/entity/soul/AttributeDisplayPercentage';

/**
 * Form Widget: input Soul's attributes.
 */
export default function SoulAttributesInput(props: WidgetProps): ReactElement {
  const propsAttributes = props.value;
  const propsOnChange = props.onChange;
  const soul: any = props.options?.soul;
  const socials =
    soul?.type == 'GAME' ? GAME_PROFILE_TRAITS : USER_PROFILE_TRAITS;

  const { showDialog, closeDialog }: Partial<TDialogContext> =
    useContext(DialogContext);
  const [attributes, setAttributes] =
    useState<Array<MetadataAttribute>>(propsAttributes); //MetaAttrHelper.sort(propsAttributes), // What for?

  useEffect(() => {
    // Update data on parent (form)
    propsOnChange(attributes);
  }, [attributes]);

  /**
   * on Value Change
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
    let newAttributes = MetaAttrHelper.attributeSet([...attributes], newAttr);
    // console.log('New Attr: ', {
    //   newAttr,
    //   newAttributes,
    //   curVal: MetaAttrHelper.extractValue(attributes, trait_type),
    // });
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
            {soul?.type == '' ? (
              <>
                <TextField
                  variant="outlined"
                  onChange={onChange}
                  label="First Name"
                  name={PROFILE_TRAIT_TYPE.firstName}
                  disabled={props.disabled}
                  value={MetaAttrHelper.extractValue(
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
                  value={MetaAttrHelper.extractValue(
                    attributes,
                    PROFILE_TRAIT_TYPE.lastName,
                  )}
                  required
                />
                <TextField
                  variant="outlined"
                  onChange={onChange}
                  label="Email (Publicly Visible)"
                  name={PROFILE_TRAIT_TYPE.email}
                  disabled={props.disabled}
                  value={MetaAttrHelper.extractValue(
                    attributes,
                    PROFILE_TRAIT_TYPE.email,
                  )}
                  placeholder="email@domain.com"
                />
                <TextField
                  variant="outlined"
                  onChange={onChange}
                  label="A little bit about yourself"
                  name={PROFILE_TRAIT_TYPE.description}
                  disabled={props.disabled}
                  value={MetaAttrHelper.extractValue(
                    attributes,
                    PROFILE_TRAIT_TYPE.description,
                  )}
                  multiline
                  rows={4}
                />
              </>
            ) : (
              <>
                <TextField
                  variant="outlined"
                  onChange={onChange}
                  label="Name"
                  name="name"
                  disabled={props.disabled}
                  value={
                    MetaAttrHelper.extractValue(attributes, 'name') ||
                    soul?.metadata?.name ||
                    ''
                  }
                  required
                />
                <TextField
                  variant="outlined"
                  onChange={onChange}
                  label="Description"
                  name="description"
                  disabled={props.disabled}
                  value={
                    MetaAttrHelper.extractValue(attributes, 'description') ||
                    soul?.metadata?.description ||
                    ''
                  }
                  multiline
                  rows={6}
                />
              </>
            )}
          </Stack>
        </Grid>
        <Grid key={2} item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid key={'header'} item xs={12}>
              <Typography variant="h6">Socials</Typography>
            </Grid>
            {socials.map((name: any, index: number) => {
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
                    value={MetaAttrHelper.extractValue(attributes, name)}
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
      {soul?.type == '' && (
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid key={'header'} item xs={12}>
            <Typography variant="h6">Skills</Typography>
          </Grid>
          {attributes.map((item: MetadataAttribute, index: number) => {
            return item?.display_type != 'boost_percentage' ? null : (
              <Grid key={item.trait_type} item xs={4} sm={2} lg={2}>
                <Button
                  title="Remove Skill"
                  onClick={() =>
                    setAttributes(MetaAttrHelper.removeItem(attributes, item))
                  }
                  sx={{
                    color: 'red',
                    minWidth: '20px',
                    float: 'right',
                    zIndex: 10,
                    borderRadius: '12px 0 0 0',
                    position: 'absolute',
                    padding: '8px',
                  }}
                >
                  <DeleteForeverIcon />
                </Button>
                <AttributeDisplayPercentage item={item} />
              </Grid>
            );
          })}
          <Grid key="addButtonCell" item xs={4} sm={2} lg={1}>
            <Button
              sx={{ aspectRatio: '1 !important', marginTop: '24px' }}
              variant="outlined"
              title="Add Skill"
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
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
