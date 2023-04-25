import React from 'react';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import { render, screen } from '../../../utils/test-utils';
import useUser from '../../hooks/useUser';
import UnauthenticatedRoute from './UnauthenticatedRoute';
import { faker } from '@faker-js/faker';

const makeRoutes = () => (
  <Routes>
    <Route
      path="/login"
      element={<UnauthenticatedRoute element={<div>Login</div>} />}
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

  return children;
};

describe('UnauthenticatedRoute', () => {
  it('should allow the user to access the page if not logged in', () => {
    render(
      <AuthProvider value={null}>
        <MemoryRouter initialEntries={['/login']}>{routes}</MemoryRouter>
      </AuthProvider>,
    );

    expect(screen.queryByText('Login')).not.toBeNull();
  });

  it('should redirect user to dashboard if logged in', () => {
    const user = {
      firstName: faker.name.firstName(),
    };

    render(
      <AuthProvider value={user}>
        <MemoryRouter initialEntries={['/login']}>{routes}</MemoryRouter>
      </AuthProvider>,
    );

    expect(screen.queryByText('Dashboard')).not.toBeNull();
  });
});
