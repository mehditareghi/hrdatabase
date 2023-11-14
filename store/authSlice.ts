import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  isLoggedIn: boolean;
  role: string[]; // Add the role property to the AuthState type
};

const initialState: AuthState = {
  isLoggedIn: false,
  role: [], // Initialize the role property to an empty array
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