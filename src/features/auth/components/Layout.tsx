/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Typography,
  Container,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Link } from '@/components/Elements';
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container
      component="main"
      maxWidth={isMobile && 'sm'}
      sx={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.palette.background.default,
        padding: 0,
      }}
    >
      <Paper
        elevation={5}
        sx={{
          width: isMobile ? '100vw' : 400,
          borderRadius: isMobile ? 0 : 5,
          height: isMobile ? '100vh' : 480,
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
