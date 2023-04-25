import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  user: any | null;
}

const userItem = localStorage.getItem('rrac-user');

const initialState = {
  user: userItem ? (JSON.parse(userItem) as any) : null,
} as UserState;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    update(state, action: PayloadAction<any | null>) {
      state.user = action.payload;
    },
  },
});

export default userSlice;
