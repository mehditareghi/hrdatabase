import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  isLoggedIn: boolean;
};

const initialState: AuthState = {
  isLoggedIn: false,
  role: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    setRole: (state, action: PayloadAction<string[]>) => {
      state.role = action.payload;
    },
  },
});

export const { setLoggedIn, setRole } = authSlice.actions;

export default authSlice.reducer;
