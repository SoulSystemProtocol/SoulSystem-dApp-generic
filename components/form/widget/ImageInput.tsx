import { AddOutlined } from '@mui/icons-material';
import { Avatar, CircularProgress, Input, Stack, SxProps } from '@mui/material';
import { Box } from '@mui/system';
import { WidgetProps } from '@rjsf/core';
import useError from 'hooks/useError';
import useIpfs from 'hooks/useIpfs';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { resolveLink } from 'helpers/IPFS';
import InvalidFileError from 'errors/InvalidFileError';

/**
 * A widget to input an image, upload it to IPFS, and get URI.
 */
export default function ImageInput(props: WidgetProps): ReactElement {
  const propsDisabled = props.disabled;
  const propsSx: SxProps = (props.options?.sx as SxProps) || {};
  const propsHeader = props.options?.header;
  const defaultValue = props?.options?.default || '';
  const size = props.uiSchema?.size || 164;
  const elId = 'imageInput';
  const propsOnChange = props.onChange;
  const { handleError } = useError();
  const { uploadFileToIPFS } = useIpfs();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [img, setImg] = useState<string>('');

  useEffect(() => {
    if (props.value) {
      setImg(props.value);
    } else {
      setImg(String(defaultValue));
    }
  }, [props.value]);

  // console.warn('Image props', props);

  /// Input File Validation
  const isFileValid = (file: any) => {
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
  };

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
    <Box sx={propsSx}>
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
            borderRadius: props.uiSchema?.borderRadius || '50%',
          }}
          src={!isLoading ? resolveLink(img) : undefined}
        >
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Stack direction="column" alignItems="center" marginTop={1}>
              {props.options?.label ? (
                (props.options.label as ReactNode)
              ) : (
                <AddOutlined />
              )}
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
