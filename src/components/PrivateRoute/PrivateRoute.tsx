import React from 'react';
import { Navigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import { AppRouteContext } from '../AppRoutes/AppRoutes';

interface PrivateRouteProps {
  authorizedRoles: string[];
  element: React.ReactNode;
}

const PrivateRoute = ({
  authorizedRoles,
  element,
}: PrivateRouteProps): JSX.Element => {
  const { notFoundPage, rootAuthenticated } = React.useContext(AppRouteContext);
  const user = useUser();

  if (!user.data) {
    return <Navigate to={rootAuthenticated} />;
  }

  return user.hasSomeRoles(authorizedRoles) ? (
    <>{element}</>
  ) : notFoundPage;
};

export default PrivateRoute;
