import React from 'react';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import { render, screen } from '../../../utils/test-utils';
import useUser from '../../hooks/useUser';
import PrivateRoute from './PrivateRoute';

const makeRoutes = () => (
  <Routes>
    <Route path="/login" element={<div>Login</div>} />
    <Route
      path="/users/new"
      element={
        <PrivateRoute
          authorizedRoles={['SUPER_ADMIN']}
          element={<div>Account</div>}
        />
      }
    />
    <Route path="/dashboard" element={<div>Dashboard</div>} />
  </Routes>
);

const routes = makeRoutes();

const AuthProvider = ({ children, value }: any) => {
  const user = useUser();

  React.useEffect(() => {
    user.update(value);
  }, []);

  return user.data ? children : null;
};

describe('PrivateRoute', () => {
  it('should redirect user to login if not logged in', () => {
    render(
      <MemoryRouter initialEntries={['/users/new']}>{routes}</MemoryRouter>,
    );

    expect(screen.queryByText('Login')).not.toBeNull();
  });

  it('should allow the user to access the page if they have the authorized roles', () => {
    const user = {
      roles: ['SUPER_ADMIN'],
    };

    render(
      <AuthProvider value={user}>
        <MemoryRouter initialEntries={['/users/new']}>{routes}</MemoryRouter>
      </AuthProvider>,
    );

    expect(screen.queryByText('Account')).not.toBeNull();
    expect(screen.queryByText('404')).toBeNull();
  });

  it('should not allow the user to access the page if he does not have the authorized roles', () => {
    const user = {
      roles: [],
    };

    render(
      <AuthProvider value={user}>
        <MemoryRouter initialEntries={['/users/new']}>{routes}</MemoryRouter>
      </AuthProvider>,
    );

    expect(screen.queryByText('Account')).toBeNull();
    expect(screen.queryByText('404')).not.toBeNull();
  });
});
