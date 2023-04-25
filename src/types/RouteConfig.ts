import React from 'react';
import { RouteProps } from 'react-router-dom';

export type RouteConfig = RouteProps & {
  access: 'authenticated' | 'unauthenticated';
  authorizedRoles?: string[];
  context?: React.ReactNode;
  initialize?: boolean;
  subRoutes?: RouteConfig[];
  navigation?: string;
  condition?: (context: any) => boolean;
};