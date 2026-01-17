import { Card } from '@/shared/ui/Card/Card';
import { Navbar } from '@/widgets/Navbar';
import { PageLoader } from '@/widgets/PageLoader';
import { Sidebar } from '@/widgets/Sidebar';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <Sidebar />
      <Card variant="bg-primary" fullWidth isOverflowAuto>
        <Navbar />
        <Card as="main">
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </Card>
      </Card>
    </>
  );
};
