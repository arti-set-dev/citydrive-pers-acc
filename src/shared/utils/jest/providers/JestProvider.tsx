import React, { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  route?: string;
}

const customRender = (
  ui: ReactElement,
  { route = '/', ...options }: ExtendedRenderOptions = {},
) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
  );

  return render(ui, { wrapper: Wrapper, ...options });
};

export * from '@testing-library/react';
export { customRender as render };
