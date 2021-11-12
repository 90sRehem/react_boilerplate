import { ReactNode, Suspense } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ErrorBoundary } from 'react-error-boundary';

import { BrowserRouter as Router } from 'react-router-dom';

import { queryClient } from '@/lib/react-query';

interface AppProviderProps {
  children: ReactNode;
}

const ErrorFallback = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        textDecorationColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
      }}
      role="alert"
    >
      <h2>Ooops, something went wrong :( </h2>
      <Button onClick={() => window.location.assign(window.location.origin)}>
        Refresh
      </Button>
    </div>
  );
};

export function AppProvider({ children }: AppProviderProps): JSX.Element {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100vh',
          }}
        >
          <CircularProgress />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient}>
          {process.env.NODE_ENV !== 'production' && (
            <ReactQueryDevtools position="bottom-right" />
          )}
          <Router>{children}</Router>
        </QueryClientProvider>
      </ErrorBoundary>
    </Suspense>
  );
}
