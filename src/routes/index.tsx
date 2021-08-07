import { ComponentType, ReactNode } from 'react';
import { Switch, withRouter } from 'react-router-dom';
import { Route } from 'components/Route';
import { LoginPage } from '../pages/Login';
import { PageNotFound } from '../pages/NotFound';

type RouteProps = {
  id: number;
  name: string;
  path: string | undefined;
  component: ComponentType;
  isPrivate: boolean;
  icon?: ReactNode;
  hasMenu: boolean;
  can?: Array<string>;
  exact?: boolean;
};

const routes: RouteProps[] = [
  {
    id: 1,
    name: 'login',
    path: '/',
    component: LoginPage,
    isPrivate: false,
    hasMenu: false,
    exact: true,
  },
];

function CustomRoutes() {
  return (
    <Switch>
      {routes.map(route => (
        // eslint-disable-next-line react/no-array-index-key
        <Route path={null} key={route.id} {...route} />
      ))}
      <Route isPrivate component={PageNotFound} />
    </Switch>
  );
}

export const Routes = withRouter(CustomRoutes);
