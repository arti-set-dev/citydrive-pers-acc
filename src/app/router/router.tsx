import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { Layout } from '../Layout';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { routeConfig } from './types/config';
import { RequireAuth } from './RequireAuth';
import { PATHS } from '@/shared/lib/router/paths';

const childRoutes: RouteObject[] = Object.values(routeConfig).map(
  ({ path, element: Component, authOnly, guestOnly }) => ({
    path,
    index: path === PATHS.home,
    element: (
      <RequireAuth authOnly={authOnly} guestOnly={guestOnly}>
        <Component />
      </RequireAuth>
    ),
  }),
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      ...childRoutes,
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
