import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AccessRoute from '../AccessRoute';
import { RouteConfig } from '../../types';
import { AppRouteContext } from '../AppRoutes/AppRoutes';

const RecursiveRoutes = (props: RouteConfig) => {
  const { notFoundPage } = React.useContext(AppRouteContext);
  const {
    path,
    element,
    subRoutes,
    initialize,
    access,
    authorizedRoles,
    context,
    condition,
  } = props;
  const hasSubRoutes = subRoutes && subRoutes.length;

  if (initialize) {
    return (
      <Routes>
        <Route path="/" element={context}>
          <Route
            path={`${path}/*`}
            element={<RecursiveRoutes {...props} initialize={false} />}
          />
        </Route>
      </Routes>
    );
  }

  if (hasSubRoutes) {
    return (
      <Routes>
        <Route
          path="/"
          element={
            element ? (
              <AccessRoute
                access={access}
                authorizedRoles={authorizedRoles}
                element={element}
                condition={condition}
              />
            ) : notFoundPage
          }
        />
        <Route
          path="/*"
          element={
            <Routes>
              {subRoutes.map((subRoute, key) => {
                const pathName = subRoute.subRoutes?.length
                  ? `${subRoute.path}/*`
                  : subRoute.path;

                return (
                  <Route
                    key={`Route-${subRoute.path}-${key}`}
                    path={pathName}
                    element={<RecursiveRoutes {...subRoute} />}
                  />
                );
              })}
              <Route path="*" element={notFoundPage} />
            </Routes>
          }
        />
      </Routes>
    );
  }

  return (
    <AccessRoute
      access={access}
      authorizedRoles={authorizedRoles}
      element={element}
      condition={condition}
    />
  );
};

export default RecursiveRoutes;
