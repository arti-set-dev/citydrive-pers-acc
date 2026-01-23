import { employeeActions, useGetEmployeeDataQuery } from '@/entities/Employee';
import { getIsAuth } from '@/features/login';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/hooks/useAppSelector/useAppSelector';
import { Card } from '@/shared/ui/Card/Card';
import { Text } from '@/shared/ui/Text/Text';
import { Navbar } from '@/widgets/Navbar';
import { PageLoader } from '@/widgets/PageLoader';
import { Sidebar } from '@/widgets/Sidebar';
import { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  const dispatch = useAppDispatch();
  const isAuth =
    useAppSelector(getIsAuth) || Boolean(localStorage.getItem('token'));

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
    <>
      {isAuth && <Sidebar />}

      <Card variant="bg-primary" fullWidth isOverflowAuto>
        {isAuth && <Navbar />}

        <Card as="main">
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </Card>
      </Card>
    </>
  );
};
