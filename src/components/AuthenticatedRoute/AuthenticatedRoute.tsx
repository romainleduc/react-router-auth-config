import React from 'react';
import { Navigate } from 'react-router-dom';
import { AppRouteContext } from '../AppRoutes/AppRoutes';
import useUser from '../../hooks/useUser';

interface AuthenticatedRouteProps {
  element: React.ReactNode;
}

const AuthenticatedRoute = ({
  element,
}: AuthenticatedRouteProps): JSX.Element => {
  const user = useUser();
  const { rootAuthenticated } = React.useContext(AppRouteContext);

  return user.data !== null ? <>{element}</> : <Navigate to={rootAuthenticated} />;
};

export default AuthenticatedRoute;
