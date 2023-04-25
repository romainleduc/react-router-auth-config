import React from 'react';
import { AnyAction, configureStore, Store } from '@reduxjs/toolkit';
import { Provider, ProviderProps } from 'react-redux';
import userSlice from './userSlice';

export const defaultStore = configureStore({
  reducer: {
    auth: userSlice.reducer,
  },
});

interface StoreProviderProps extends Omit<ProviderProps, 'store'> {
  store?: Store<any, AnyAction>;
}

const StoreProvider = ({
  store,
  ...otherProps
}: StoreProviderProps): JSX.Element => {
  return <Provider store={store || defaultStore} {...otherProps} />;
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof defaultStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof defaultStore.dispatch;

export default StoreProvider;
