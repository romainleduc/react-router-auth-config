import React from 'react';
import AuthenticatedRoute from '../AuthenticatedRoute';
import PrivateRoute from '../PrivateRoute';
import UnauthenticatedRoute from '../UnauthenticatedRoute';
import ValidationRoute from '../ValidationRoute';

interface AccessRouteProps {
  access: 'authenticated' | 'unauthenticated';
  element: React.ReactNode;
  authorizedRoles?: string[];
  condition?: (context: any) => boolean;
}

const AccessRoute = ({
  access,
  element,
  authorizedRoles,
  condition,
}: AccessRouteProps): JSX.Element => {

  return (
  <ValidationRoute condition={condition}>
    {access === 'unauthenticated' ? (
      <UnauthenticatedRoute element={element} />
    ) : access === 'authenticated' ? (
      authorizedRoles ? (
        <PrivateRoute authorizedRoles={authorizedRoles} element={element} />
      ) : (
        <AuthenticatedRoute element={element} />
      )
    ) : (
      element
    )}
  </ValidationRoute>
);
    }
export default AccessRoute;
