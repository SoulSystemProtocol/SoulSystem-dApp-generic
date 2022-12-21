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

/**
 * A widget to input an image, upload it to IPFS, and get URI.
 */
export default function ImageInput(props: WidgetProps): ReactElement {
  const propsDisabled = props.disabled;
  const propsSx = props.options?.sx;
  const propsHeader = props.options?.header;
  const propsImage = props.value;
  const propsOnChange = props.onChange;
  const { handleError } = useError();
  const { uploadFileToIPFS } = useIpfs();
  const [isLoading, setIsLoading] = useState(false);
  const size = 164;
  const elId = 'imageInput';

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
      if (!isFileValid(file)) {
        throw new Error(
          'Sorry, Only JPG/PNG/GIF files with size smaller than 2MB are currently supported',
        );
      }
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
        style={{ display: 'block', width: size, height: size }}
      >
        <Avatar
          sx={{
            cursor: !isLoading && !propsDisabled ? 'pointer' : null,
            width: size,
            height: size,
            borderRadius: '50%',
          }}
          src={!isLoading ? resolveLink(propsImage) : undefined}
        >
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Stack direction="column" alignItems="center" marginTop={2}>
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
