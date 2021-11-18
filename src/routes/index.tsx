import { useAuth } from '@/providers/auth';
import { useRoutes } from 'react-router-dom';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = (): JSX.Element => {
  const { isAuthenticated } = useAuth();

  const routes = isAuthenticated ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes]);

  return <>{element}</>;
};
