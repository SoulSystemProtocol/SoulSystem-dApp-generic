import {
  Autocomplete,
  Box,
  CircularProgress,
  TextField,
  SxProps,
} from '@mui/material';
import SoulCompactCard from 'components/entity/soul/SoulCompactCard';
// import useError from 'hooks/useError';
import { ReactElement, useEffect, useState } from 'react';
import { soulName } from 'utils/soul';
import { useQuery } from '@apollo/client';
import SoulsOpenInj from 'queries/SoulsOpenInj';
import { useHydratedSoulsMetadataState } from 'hooks/useSoulMetadata';

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
    ssr: false,
    variables: { first: 12, skip: 0 },
  });
  const { souls: items, hydratingById } = useHydratedSoulsMetadataState(
    data?.souls || [],
  );

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
    if (error) console.error('SoulSearchBox() query failed', { data, error });
  }, [data, error]);

  return (
    <Box sx={{ ...sx }}>
      <>
        {options?.header && options.header}
        <Autocomplete
          disabled={isDisabled}
          getOptionLabel={(option) => soulName(option)}
          loading={loading}
          loadingText="Loading..."
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
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          renderOption={(props, option) => {
            const isOptionMetadataLoading = !!hydratingById[option.id];

            return (
              <li {...props} key={option.owner} style={{ display: 'block' }}>
                {isOptionMetadataLoading && (
                  <Box
                    sx={{
                      alignItems: 'center',
                      color: 'text.secondary',
                      display: 'flex',
                      gap: 1,
                      px: 0.5,
                      py: 0.75,
                    }}
                  >
                    <CircularProgress color="inherit" size={16} />
                    <span>Loading metadata...</span>
                  </Box>
                )}
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
