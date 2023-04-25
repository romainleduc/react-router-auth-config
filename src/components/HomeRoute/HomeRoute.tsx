import React from 'react';
import { Navigate } from 'react-router-dom';
import { AppRouteContext } from '../AppRoutes/AppRoutes';
import useUser from '../../hooks/useUser';

const HomeRoute = (): JSX.Element => {
  const user = useUser();
  const { rootAuthenticated, rootUnauthenticated } = React.useContext(AppRouteContext);

  return <Navigate to={user.data === null ? rootAuthenticated : rootUnauthenticated} />;
};

export default HomeRoute;
