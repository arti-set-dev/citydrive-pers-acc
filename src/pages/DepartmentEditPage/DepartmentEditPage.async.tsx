import { lazy } from 'react';

export const DepartmentEditPageAsync = lazy(
  () => import('./DepartmentEditPage'),
);
