
import { useAppDispatch } from '../redux/useAppDispatch';
import { useAppSelector } from '../redux/useAppSelector';
import userSlice from '../redux/userSlice';

const useUser = () => {
  const user = useAppSelector((state: any) => state.auth.user);
  const dispatch = useAppDispatch();

  const update = (user: any | null): void => {
    if (user === null) {
      const userItem = localStorage.getItem('rrac-user');

      if (userItem) {
        localStorage.removeItem('rrac-user');
      }

    } else {
      localStorage.setItem('rrac-user', JSON.stringify(user));
    }

    dispatch(userSlice.actions.update(user));
  };

  const hasSomeRoles = (roles: string[]): boolean => {
    if (user) {
      return user.roles.some((userRole: any) => roles.indexOf(userRole) >= 0);
    }

    return false;
  };

  return { data: user, update, hasSomeRoles };
};

export default useUser;
