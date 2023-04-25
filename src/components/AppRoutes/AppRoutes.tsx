import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RecursiveRoutes from '../RecursiveRoutes';
import HomeRoute from '../HomeRoute';
import { RouteConfig } from '../../types';
import StoreProvider from '../../redux/store';

interface AppRoutesProps {
  rootAuthenticated: string;
  rootUnauthenticated: string;
  notFoundPage: JSX.Element;
  routesConfig: RouteConfig[];
}

export const AppRouteContext = React.createContext<{
  rootAuthenticated: string;
  rootUnauthenticated: string;
  notFoundPage: JSX.Element
}>({ rootAuthenticated: '', rootUnauthenticated: '', notFoundPage: <div>404</div>});

const AppRoutes = (
  {
    rootAuthenticated,
    rootUnauthenticated,
    notFoundPage,
    routesConfig
  }: AppRoutesProps
) => (
  <StoreProvider>
    <AppRouteContext.Provider
      value={
        {
          rootAuthenticated,
          rootUnauthenticated,
          notFoundPage,
        }
      }
    >
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route
          path="/*"
          element={routesConfig.map((route, key) => (
            <RecursiveRoutes key={`RouteList-${key}`} {...route} />
          ))}
        />
      </Routes>
    </AppRouteContext.Provider>
  </StoreProvider>
);

export default AppRoutes;
