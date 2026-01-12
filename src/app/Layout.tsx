import { Card } from '@/shared/ui/Card/Card';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <Sidebar />
      <Card variant="bg-primary" fullWidth>
        <Navbar />
        <Card as="main">
          <Suspense fallback={<div>loading...</div>}>
            <Outlet />
          </Suspense>
        </Card>
      </Card>
    </>
  );
};
