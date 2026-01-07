import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './Layout';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { lazy } from 'react';
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage/AboutPage'));

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
