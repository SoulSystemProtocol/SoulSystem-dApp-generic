import { Autocomplete, Box, TextField } from '@mui/material';
import SoulCompactCard from 'components/entity/soul/SoulCompactCard';
import useError from 'hooks/useError';
import { useEffect, useMemo, useState } from 'react';
import {
  soulToFirstLastNameString,
  addressToShortAddress,
} from 'utils/converters';
import { useQuery } from '@apollo/client';
import SoulsOpenInj from 'queries/SoulsOpenInj';
import { useRouter } from 'next/router';

interface Props {
  // size?: number;
  size?: 'small' | 'medium' | undefined;
  options?: any;
  label: string;
  disabled?: boolean;
  required?: boolean;
  sx?: any;
  value?: string;
  onChange?: (id: any) => void;
}

/**
 * Form Widget: Select a Soul
 */
export default function SoulSearchBox(props: Props): JSX.Element {
  const router = useRouter();
  const propsHeader = props.options?.header;
  const propsSx = props.sx;
  const propsValue = props.value;
  const propsOnChange = props.onChange || (() => {});
  const [isDisabled, setIsDisabled] = useState(props.disabled || false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [inputValue, setInputValue] = useState<string>(''); //Current text input value
  const [searchQueryParams, setSearchQueryParams] = useState<string>(''); //Current text input value
  const [options, setOptions] = useState<Array<any>>([]);
  const { handleError } = useError();
  const type = '';
  const role = '';

  // const { accountSoul } = useContext(DataContext);

  useEffect(() => {
    let queryFilters: string[] = [];
    // queryFilters.push(`type: "" `);
    if (type !== undefined) queryFilters.push(`type: "${type}" `);
    role && queryFilters.push(`role: "${role}""`);
    inputValue &&
      queryFilters.push(`searchField_contains_nocase: "${inputValue}"`);
    let searchQueryParams = queryFilters.join(', ');
    // console.log('searchQueryParams', searchQueryParams);
    setSearchQueryParams(searchQueryParams);
  }, [inputValue]);

  const { data, loading, error } = useQuery(SoulsOpenInj(searchQueryParams), {
    // variables: { first, skip },
  });

  useEffect(() => {
    //** Handle Injected Value
    if (propsValue) {
      console.log('[DEV] Expected to Init selected value', propsValue);
      /*
      setIsDisabled(true);
      getProfile({ id: propsValue })
        .then((profile: any) => {
          setSelectedValue(profile);
          setIsDisabled(false);
        })
        .catch((error: any) => handleError(error, true));
        */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propsValue]);

  useEffect(() => {
    //Make sure options is never null | undefined
    setOptions(data ? data.souls : []);
  }, [data]);

  return (
    <Box sx={{ ...propsSx }}>
      {propsHeader}
      <Autocomplete
        disabled={isDisabled || !options}
        getOptionLabel={(option) =>
          soulToFirstLastNameString(option) +
          ' (' +
          option.id +
          ' , ' +
          addressToShortAddress(option.owner) +
          ')'
        }
        filterOptions={(x) => x}
        options={options}
        value={selectedValue}
        onChange={(_, newValue: any) => {
          console.log('onChange', newValue);
          //ID Changed
          setSelectedValue(newValue);
          propsOnChange(newValue?.id);
        }}
        onInputChange={(_, newInputValue) => {
          console.log('Input Changed to: ', newInputValue);
          //Text Value Changed
          setInputValue(newInputValue);
        }}
        isOptionEqualToValue={(option: any, value: any) =>
          option?.id === value?.id
        }
        renderInput={(params) => (
          <TextField
            // fullWidth
            {...params}
            size={props.size}
            label={props.label || 'Soul Search'}
            placeholder={'Search by name or address'}
            required={props.required || false}
            onKeyDown={(e: any) => {
              if (e.keyCode === 13) {
                router.push('/souls/' + e.target.value);
              }
            }}
          />
        )}
        renderOption={(props, option) => {
          return (
            <li {...props}>
              <SoulCompactCard
                profile={option}
                disableId={false}
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
