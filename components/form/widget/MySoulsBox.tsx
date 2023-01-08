import { Autocomplete, Box, TextField } from '@mui/material';
import SoulCompactCard from 'components/entity/soul/SoulCompactCard';
import useError from 'hooks/useError';
import { ReactElement, useContext, useEffect, useState } from 'react';
import { soulName } from 'utils/soul';
import { useQuery } from '@apollo/client';
import { DataContext } from 'contexts/data';
import SoulsManagedByQuery from 'queries/SoulsManagedByQuery';
import { WidgetProps } from '@rjsf/core';

/**
 * Form Widget: Select a Soul
 * Display Administrated Souls + Self Soul
 */
export default function SoulSearchBox({
  options,
  sx = {},
  value = '',
  size,
  label,
  required = false,
  disabled = false,
  onChange = () => {},
  onKeyDown = () => {},
}: WidgetProps): ReactElement {
  const { accountSoul } = useContext(DataContext);
  const [isDisabled, setIsDisabled] = useState(disabled);
  const [selectedSoul, setSelectedSoul] = useState(accountSoul);
  const [inputValue, setInputValue] = useState<string>(''); //Current text input value
  const [souls, setSouls] = useState<Array<any>>([]);
  const { handleError } = useError();

  const { data, loading, error } = useQuery(SoulsManagedByQuery, {
    variables: {
      Bid: accountSoul.id,
      RelRole: 'admin',
      Arole: 'MDAO',
      first: 12,
      skip: 0,
    },
  });

  useEffect(() => {
    //** Handle Injected Value
    if (value) {
      // console.warn('[TODO] Expected to Init selected value', value);
      // setInputValue(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    //Make sure options is never null | undefined
    // setSouls(data ? data.souls : []);
    setSouls(
      data
        ? [accountSoul].concat(
            data?.soulParts?.map((soulPart: any) => soulPart.aEnd),
          )
        : [accountSoul],
    );
    //Default Option
    // onChange(accountSoul?.id);
    onChange(accountSoul?.owner);
  }, [data]);

  return (
    <Box sx={{ ...sx }}>
      <>{options?.header && options.header}</>
      <Autocomplete
        disabled={isDisabled}
        getOptionLabel={soulName}
        // filterOptions={(x) => x}
        options={souls}
        value={selectedSoul}
        onChange={(_, newValue: any) => {
          console.log('onChange', newValue);
          //ID Changed
          setSelectedSoul(newValue);
          // onChange(newValue?.id);
          onChange(newValue?.owner);
        }}
        onInputChange={(_, newInputValue) => {
          console.log('Input Changed to: ', newInputValue);
          //Text Value Changed
          setInputValue(newInputValue);
        }}
        isOptionEqualToValue={(option: any, value: any) =>
          // option?.id === value?.id
          option?.owner === value?.owner
        }
        renderInput={(params) => (
          <TextField
            // fullWidth
            {...params}
            size={size}
            label={label || 'Soul Search'}
            placeholder={'Search by name or address'}
            required={required || false}
            onKeyDown={onKeyDown}
          />
        )}
        renderOption={(props, option) => {
          return (
            <li {...props}>
              <SoulCompactCard
                profile={option}
                disableAddress={false}
                disableLink={true}
                disableRating={true}
                sx={{ my: 0.6 }}
              />
            </li>
          );
        }}
      />
    </Box>
  );
}
