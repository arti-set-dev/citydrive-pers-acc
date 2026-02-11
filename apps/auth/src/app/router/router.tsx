import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PATHS } from '@citydrive/shared/lib/router/paths';
import { LoginPage } from '../../pages/LoginPage';
import { RegistrationPage } from '../../pages/RegistrationPage';
import { ForgotPasswordPage } from '../../pages/ForgotPasswordPage';
import { ResetPasswordPage } from '../../pages/ResetPasswordPage';
import NotFoundPage from '../../pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={PATHS.auth} replace />,
  },
  {
    path: PATHS.auth,
    element: <LoginPage />,
  },
  {
    path: PATHS.registration,
    element: <RegistrationPage />,
  },
  {
    path: PATHS.forgotPassword,
    element: <ForgotPasswordPage />,
  },
  {
    path: PATHS.resetPassword,
    element: <ResetPasswordPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
