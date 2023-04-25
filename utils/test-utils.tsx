import React from 'react';
import StoreProvider from '../src/redux/store';
import { AppRouteContext } from '../src/components/AppRoutes/AppRoutes';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const AllTheProviders: React.FC = ({ children }: any) => (
  <StoreProvider>
    <AppRouteContext.Provider
      value={
        {
          rootAuthenticated: '/login',
          rootUnauthenticated: '/dashboard',
          notFoundPage: <div>404</div>,
        }
      }
    >
      {children}
    </AppRouteContext.Provider>
  </StoreProvider>
);

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): RenderResult => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };