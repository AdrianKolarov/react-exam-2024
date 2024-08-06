import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: null,
    
  },
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload;
    },
    
  }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;