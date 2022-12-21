import { ReactElement } from 'react';
import { WidgetProps } from '@rjsf/core';
import SoulSearchBox from 'components/entity/soul/SoulSearchBox';

/**
 * Form Widget: Select a Soul
 */
export default function SoulSearchBoxWidget({
  options,
  value = '',
  size,
  label,
  required = false,
  disabled = false,
  onChange = () => {},
  onKeyDown = () => {},
}: WidgetProps): ReactElement {
  return (
    <SoulSearchBox
      label={label}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      required={required}
      disabled={disabled}
      size={size}
      options={options}
    />
  );
}
