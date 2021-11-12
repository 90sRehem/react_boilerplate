import { Button, Checkbox, FormControlLabel } from '@mui/material';
import * as z from 'zod';

import { Form, InputField } from '@/components/Form';

const schema = z.object({
  email: z.string().optional(),
  password: z.string().optional(),
});

type LoginValues = {
  email: string;
  password: string;
  rememberMe: string;
};

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps): JSX.Element => {
  return (
    <>
      <Form<LoginValues, typeof schema>
        onSubmit={async values => {
          console.log(values);
          onSuccess();
        }}
        schema={schema}
      >
        {({ register, formState }) => (
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

            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  {...register('rememberMe')}
                />
              }
              label="Remember me"
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
    </>
  );
};
