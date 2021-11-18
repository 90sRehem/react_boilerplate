import { Suspense } from 'react';
import { Landing } from '@/features/misc';
import { Navigate, Outlet } from 'react-router-dom';
import { Fallback } from '@/components/Elements';

const App = () => {
  return (
    <>
      <Suspense fallback={<Fallback />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export const protectedRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Landing /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];
