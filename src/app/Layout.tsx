import {
  employeeActions,
  getEmployeeData,
  useGetEmployeeDataQuery,
} from '@citydrive/entities/Employee';
import { getIsAuth } from '@citydrive/auth';
import { useAppDispatch } from '@citydrive/shared/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@citydrive/shared/hooks/useAppSelector/useAppSelector';
import { FeatureFlagContext } from '@citydrive/shared/lib/features/FeatureFlagContext';
import { Card } from '@citydrive/shared/ui/Card/Card';
import { Text } from '@citydrive/shared/ui/Text/Text';
import { Navbar } from '@/widgets/Navbar';
import { PageLoader } from '@/widgets/PageLoader';
import { Sidebar } from '@/widgets/Sidebar';
import { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  const dispatch = useAppDispatch();
  const isAuth =
    useAppSelector(getIsAuth) || Boolean(localStorage.getItem('token'));
  const employeeData = useAppSelector(getEmployeeData);

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    dispatch(employeeActions.initAuthData());
  }, [dispatch]);

  const { data, error, isLoading } = useGetEmployeeDataQuery(userId, {
    skip: !token,
  });

  useEffect(() => {
    if (data) {
      dispatch(employeeActions.setEmployeeData(data));
    }
  }, [data, dispatch]);

  if (isLoading) {
    return (
      <Card variant="bg-primary" fullWidth isOverflowAuto>
        <PageLoader />
      </Card>
    );
  }

  if (error) {
    return (
      <Card variant="bg-primary" fullWidth isOverflowAuto>
        <Text>Произошла ошибка при загрузке сайта</Text>
      </Card>
    );
  }

  return (
    <FeatureFlagContext.Provider value={employeeData?.features ?? {}}>
      {isAuth && <Sidebar />}

      <Card variant="bg-primary" fullWidth isOverflowAuto>
        {isAuth && <Navbar />}

        <Card as="main">
          <Suspense fallback={<PageLoader style={{ height: '92vh' }} />}>
            <Outlet />
          </Suspense>
        </Card>
      </Card>
    </FeatureFlagContext.Provider>
  );
};
