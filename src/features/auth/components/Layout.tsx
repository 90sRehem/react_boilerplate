/* eslint-disable jsx-a11y/anchor-is-valid */
import { Box, Typography, Container, Paper } from '@mui/material';
import { Link } from '@/components/Elements/Link';
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" to="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={5}
        sx={{
          width: '100%',
          borderRadius: 5,
          height: 480,
          // marginTop: theme.breakpoints.up('sm') ? 0 : theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
        }}
      >
        <Typography component="h1" variant="h5">
          Logo
        </Typography>
        {children}
      </Paper>
      <Copyright
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
        }}
      />
    </Container>
  );
}
