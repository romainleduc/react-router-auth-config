import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen } from '../../../utils/test-utils';
import useUser from '../../hooks/useUser';
import { faker } from '@faker-js/faker';
import AuthenticatedRoute from './AuthenticatedRoute';

const makeRoutes = () => (
  <Routes>
    <Route path="/login" element={<div>Login</div>} />
    <Route
      path="/dashboard"
      element={<AuthenticatedRoute element={<div>Dashboard</div>} />}
    />
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

describe('AuthenticatedRoute', () => {
  it('should redirect user to login if not logged in', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>{routes}</MemoryRouter>,
    );

    expect(screen.queryByText('Login')).not.toBeNull();
    expect(screen.queryByText('Dashboard')).toBeNull();
  });

  it('should allow the user to access the page if logged in', () => {
    const user = {
      firstName: faker.name.firstName(),
    };

    render(
      <AuthProvider value={user}>
        <MemoryRouter initialEntries={['/dashboard']}>{routes}</MemoryRouter>
      </AuthProvider>,
    );

    expect(screen.queryByText('Dashboard')).not.toBeNull();
    expect(screen.queryByText('Login')).toBeNull();
  });
});
