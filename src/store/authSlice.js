import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: null,
    // other auth state
  },
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload;
    },
    // other reducers
  }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;