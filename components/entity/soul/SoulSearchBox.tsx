import { Autocomplete, Box, TextField, SxProps } from '@mui/material';
import SoulCompactCard from 'components/entity/soul/SoulCompactCard';
// import useError from 'hooks/useError';
import { ReactElement, useEffect, useState } from 'react';
import { soulName } from 'utils/soul';
import { useQuery } from '@apollo/client';
import SoulsOpenInj from 'queries/SoulsOpenInj';

interface TProps {
  options?: any;
  label: string;
  sx?: SxProps;
  size?: 'small' | 'medium';
  disabled?: boolean;
  required?: boolean;
  value?: string;
  id?: string;
  onChange?: (id: any) => void;
  onKeyDown?: (e: any) => void;
  type?: string;
  role?: string;
}

/**
 * Soul Select Box
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
  type,
  role,
}: TProps): ReactElement {
  const [isDisabled, setIsDisabled] = useState(disabled);
  const [selectedSoul, setSelectedSoul] = useState(null);
  const [inputValue, setInputValue] = useState<string>(''); //Current text input value
  const [searchQueryParams, setSearchQueryParams] = useState<Array<string>>([]); //Current text input value
  const [items, setItems] = useState<Array<any>>([]);
  // const { handleError } = useError();

  useEffect(() => {
    let queryFilters: string[] = [];
    // queryFilters.push(`type: "" `);
    if (type !== undefined) queryFilters.push(`type: "${type}"`);
    if (role !== undefined) queryFilters.push(`role: "${role}"`);
    inputValue &&
      queryFilters.push(`searchField_contains_nocase: "${inputValue}"`);
    setSearchQueryParams(queryFilters);
  }, [inputValue]);

  const { data, loading, error } = useQuery(SoulsOpenInj(searchQueryParams), {
    variables: { first: 12, skip: 0 },
  });

  useEffect(() => {
    //** Handle Injected Value
    if (value) {
      console.log('[DEV] Expected to Init selected value', value);
      /*
      setIsDisabled(true);
      getProfile({ id: value })
        .then((profile: any) => {
          setSelectedSoul(profile);
          setIsDisabled(false);
        })
        .catch((error: any) => handleError(error, true));
        */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    //Make sure options is never null | undefined
    setItems(data ? data.souls : []);
  }, [data]);

  return (
    <Box sx={{ ...sx }}>
      <>
        {options?.header && options.header}
        <Autocomplete
          disabled={isDisabled}
          getOptionLabel={(option) => soulName(option)}
          // filterOptions={(x) => x}
          options={items}
          value={selectedSoul}
          onChange={(_, newValue: any) => {
            // console.log('onChange', newValue);
            //ID Changed
            setSelectedSoul(newValue);
            onChange(newValue?.id);
          }}
          onInputChange={(_, newInputValue) => {
            // console.log('Input Changed to: ', newInputValue);
            //Text Value Changed
            setInputValue(newInputValue);
          }}
          isOptionEqualToValue={(option: any, value: any) =>
            option?.id === value?.id
          }
          renderInput={(params) => (
            <TextField
              {...params}
              size={size}
              label={label || 'Search'}
              placeholder={'Search by name or address'}
              required={required || false}
              onKeyDown={onKeyDown}
            />
          )}
          renderOption={(props, option) => {
            //Validate
            // if (!option?.metadata) console.log('Skip option', option);
            return !option?.metadata ? (
              <></>
            ) : (
              <li {...props} key={option.owner} style={{ display: 'block' }}>
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
      </>
    </Box>
  );
}
