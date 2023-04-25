import React from 'react';
import { AppRouteContext } from '../AppRoutes/AppRoutes';
import useUser from '../../hooks/useUser';

interface ValidationRouteProps {
  condition?: (context: any) => boolean;
  children: any;
}

const ValidationRoute = ({
  condition,
  children,
}: ValidationRouteProps): JSX.Element => {
  const { notFoundPage } = React.useContext(AppRouteContext);
  const user = useUser();

  if (!condition || (user && condition({ user: user.data }))) {
    return children;
  }

  return notFoundPage;
};

export default ValidationRoute;
