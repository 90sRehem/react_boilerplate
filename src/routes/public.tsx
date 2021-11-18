import { Suspense } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Fallback } from '@/components/Elements';
import { lazyImport } from '@/utils/lazyImport';

const { AuthRoutes } = lazyImport(
  () => import('@/features/auth'),
  'AuthRoutes',
);

const App = () => {
  return (
    <>
      <Suspense fallback={<Fallback />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export const publicRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <AuthRoutes /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];
