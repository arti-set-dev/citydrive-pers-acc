import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage';
import { lazy, useEffect } from 'react';
import { Layout } from './Layout';
const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const AboutPage = lazy(() => import('../pages/AboutPage/AboutPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true, // Главная страница (/)
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: '*', // 404 ошибка
        element: <NotFoundPage />,
      },
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
