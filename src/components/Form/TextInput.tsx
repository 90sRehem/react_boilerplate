import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { TextField, StandardTextFieldProps } from '@mui/material';
import { forwardRef, ForwardRefRenderFunction } from 'react';

interface InputProps extends StandardTextFieldProps {
  name: string;
  label: string;
  error?: boolean;
  errorMessage?: FieldError;
  registration: Partial<UseFormRegisterReturn>;
}

const CustomTextInput: ForwardRefRenderFunction<HTMLInputElement, InputProps> =
  ({ name, label, error, errorMessage, registration, ...rest }, ref) => {
    return (
      <TextField
        fullWidth
        variant="outlined"
        margin="normal"
        id={name}
        label={label}
        error={error}
        helperText={errorMessage}
        ref={ref}
        {...registration}
        {...rest}
      />
    );
  };

export const InputField = forwardRef(CustomTextInput);
