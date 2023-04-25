import React from 'react';
import { Navigate } from 'react-router-dom';
import { AppRouteContext } from '../AppRoutes/AppRoutes';
import useUser from '../../hooks/useUser';

interface UnauthenticatedRouteProps {
  element: React.ReactNode;
}

const UnauthenticatedRoute = ({
  element,
}: UnauthenticatedRouteProps): JSX.Element => {
  const { rootUnauthenticated } = React.useContext(AppRouteContext);
  const user = useUser();

  if (user.data === null) {
    return <>{element}</>;
  }

  return <Navigate to={rootUnauthenticated} />
};

export default UnauthenticatedRoute;
