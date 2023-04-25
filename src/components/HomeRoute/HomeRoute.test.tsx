import React from 'react';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import { render, screen } from '../../../utils/test-utils';
import useUser from '../../hooks/useUser';
import HomeRoute from './HomeRoute';
import { faker } from '@faker-js/faker';

const makeRoutes = () => (
  <Routes>
    <Route path="/" element={<HomeRoute />} />
    <Route path="/login" element={<div>Login</div>} />
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

describe('HomeRoute', () => {
  it('should redirect user to login if not logged in', () => {
    render(<MemoryRouter initialEntries={['/']}>{routes}</MemoryRouter>);

    expect(screen.queryByText('Login')).not.toBeNull();
    expect(screen.queryByText('Dashboard')).toBeNull();
  });

  it('should allow the user to access the page if they have the authorized roles', () => {
    const user = {
      firstName: faker.name.firstName(),
    };

    render(
      <AuthProvider value={user}>
        <MemoryRouter initialEntries={['/']}>{routes}</MemoryRouter>
      </AuthProvider>,
    );

    expect(screen.queryByText('Dashboard')).not.toBeNull();
    expect(screen.queryByText('Login')).toBeNull();
  });
});
