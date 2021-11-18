import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  useTheme,
} from '@mui/material';
import * as z from 'zod';
import { Controller } from 'react-hook-form';
import { Brightness7, Brightness4 } from '@mui/icons-material';

import { Form, InputField } from '@/components/Form';
import { useCustomTheme } from '@/styles/theme';
import { useAuth } from '@/lib/auth';

const schema = z.object({
  email: z.string().optional(),
  password: z.string().optional(),
  rememberMe: z.boolean().optional(),
});

type LoginValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps): JSX.Element => {
  const theme = useTheme();
  const { signIn, loading } = useAuth();
  const { toggleColorMode } = useCustomTheme();

  return (
    <>
      <Form<LoginValues, typeof schema>
        onSubmit={async values => {
          console.log(values);
          await signIn(values);
          onSuccess();
        }}
        schema={schema}
      >
        {({ register, formState, control }) => (
          <>
            <InputField
              type="email"
              name="email"
              label="Email Address"
              error={!!formState.errors.email}
              errorMessage={formState.errors.email}
              registration={register('email')}
            />
            <InputField
              type="password"
              name="password"
              label="Password"
              error={!!formState.errors.password}
              errorMessage={formState.errors.password}
              registration={register('password')}
            />
            <Controller
              name="rememberMe"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox size="small" color="primary" {...field} />}
                  label="Lembrar de mim"
                />
              )}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </>
        )}
      </Form>
      <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </>
  );
};
