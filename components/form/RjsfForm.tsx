import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import type { FormProps } from '@rjsf/core';

export default function RjsfForm(props: Omit<FormProps, 'validator'>) {
  return <Form {...props} validator={validator} />;
}
