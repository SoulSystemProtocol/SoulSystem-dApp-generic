import { AddOutlined } from '@mui/icons-material';
import {
  Avatar,
  CircularProgress,
  Input,
  Stack,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { WidgetProps } from '@rjsf/core';
import useError from 'hooks/useError';
import useIpfs from 'hooks/useIpfs';
import { ReactElement, ReactNode, useState } from 'react';
import { resolveLink } from 'helpers/IPFS';
import InvalidFileError from 'errors/InvalidFileError';

/**
 * A widget to input an image, upload it to IPFS, and get URI.
 */
export default function CoverInput(props: WidgetProps): ReactElement {
  const propsDisabled = props.disabled;
  const propsSx = props.options?.sx;
  const propsHeader = props.options?.header;
  const propsOnChange = props.onChange;
  const { handleError } = useError();
  const { uploadFileToIPFS } = useIpfs();
  const [isLoading, setIsLoading] = useState(false);
  const size = '230px';
  const elId = 'coverInput';

  /// Input File Validation
  function isFileValid(file: any) {
    if (!file) return false;
    //Validate Type
    const isJpgOrPng =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/gif' ||
      file.type === 'image/webp' ||
      file.type === 'image/svg+xml';
    if (!isJpgOrPng) return false;
    //Validate Size
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) return false;
    //Pass
    return true;
  }

  async function onChange(event: any) {
    // Get file
    const file = event.target.files[0];
    // Ignore not existing file
    if (!file) return;
    // Upload file to IPFS
    try {
      if (!isFileValid(file)) throw new InvalidFileError();
      setIsLoading(true);
      const { url } = await uploadFileToIPFS(file);
      propsOnChange(url);
    } catch (error: any) {
      handleError(error, true);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Box sx={{ ...(propsSx as object) }}>
      {propsHeader as ReactNode}
      <label
        htmlFor={elId}
        style={{ display: 'block', width: '100%', height: size }}
      >
        <Avatar
          sx={{
            cursor: !isLoading && !propsDisabled ? 'pointer' : null,
            width: '100%',
            height: size,
            borderRadius: '12px',
          }}
          src={!isLoading ? resolveLink(props.value) : undefined}
        >
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Stack direction="column" alignItems="center" marginTop={1}>
              <AddOutlined />
              <Typography variant="subtitle2">{props.label}</Typography>
            </Stack>
          )}
        </Avatar>
        <Input
          onChange={onChange}
          sx={{ display: 'none' }}
          id={elId}
          type="file"
          disabled={isLoading || propsDisabled}
        />
      </label>
    </Box>
  );
}
