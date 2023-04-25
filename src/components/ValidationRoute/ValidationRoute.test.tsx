import React from 'react';
import { render, screen } from '../../../utils/test-utils';
import useUser from '../../hooks/useUser';
import ValidationRoute from './ValidationRoute';
import { faker } from '@faker-js/faker';

let user: { firstName: string };

beforeEach(() => {
  user = {
    firstName: faker.name.firstName(),
  };
});

const AuthProvider = ({ children, value }: any) => {
  const user = useUser();

  React.useEffect(() => {
    user.update(value);
  }, []);

  return user.data ? children : null;
};

describe('ValidationRoute', () => {
  it('should display the content if the condition is valid', () => {
    const conditionFn = (context: any) => {
      return context.user.firstName === user.firstName;
    };

    render(
      <AuthProvider value={user}>
        <ValidationRoute condition={conditionFn}>My content</ValidationRoute>
      </AuthProvider>,
    );

    expect(screen.queryByText('My content')).not.toBeNull();
    expect(screen.queryByText('404')).toBeNull();
  });

  it('should not display content if condition is invalid', () => {
    const conditionFn = (context: any) => {
      return context.user.firstName !== user.firstName;
    };

    render(
      <AuthProvider value={user}>
        <ValidationRoute condition={conditionFn}>My content</ValidationRoute>
      </AuthProvider>,
    );

    expect(screen.queryByText('My content')).toBeNull();
    expect(screen.queryByText('404')).not.toBeNull();
  });
});
