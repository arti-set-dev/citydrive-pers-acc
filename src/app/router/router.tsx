import { HomePage } from '@/pages/HomePage';

import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { Layout } from '../Layout';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { routeConfig, RoutePath, routePathMap } from './types/config';

const childRoutes: RouteObject[] = Object.entries(routeConfig).map(
  ([key, Component]) => ({
    path: routePathMap[key as RoutePath],
    element: <Component />,
  }),
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      ...childRoutes,
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
