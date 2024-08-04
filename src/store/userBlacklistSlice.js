import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs, deleteDoc, doc,  updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

// Async thunk to add player to the user's blacklist
export const addToUserBlacklist = createAsyncThunk(
  'userBlacklist/addToUserBlacklist',
  async (player, { getState }) => {
    const userId = getState().auth.userId;
    const userBlacklistRef = collection(db, 'users', userId, 'blacklist');
    const docRef = await addDoc(userBlacklistRef, player);
    return { ...player, id: docRef.id };
  }
);

// Async thunk to fetch user's blacklist
export const fetchUserBlacklist = createAsyncThunk(
  'userBlacklist/fetchUserBlacklist',
  async (_, { getState }) => {
    const userId = getState().auth.userId;
    const userBlacklistRef = collection(db, 'users', userId, 'blacklist');
    const res = await getDocs(userBlacklistRef);
    return res.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  }
);

// Async thunk to remove player from the user's blacklist
export const removeFromUserBlacklist = createAsyncThunk(
  'userBlacklist/removeFromUserBlacklist',
  async (id, { getState }) => {
    const userId = getState().auth.userId;
    await deleteDoc(doc(db, 'users', userId, 'blacklist', id));
    return id;
  }
);

// Async thunk to update player's note
export const updateUserBlacklist = createAsyncThunk(
  'userBlacklist/updateUserBlacklist',
  async (player, { getState }) => {
    const userId = getState().auth.userId;
    const userBlacklistRef = doc(db, 'users', userId, 'blacklist', player.id);
    await updateDoc(userBlacklistRef, { note: player.note });
    return player;
  }
);

const userBlacklistSlice = createSlice({
  name: 'userBlacklist',
  initialState: [],
  reducers: {
    setUserBlacklist: (state, action) => {
      return action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserBlacklist.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addToUserBlacklist.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(removeFromUserBlacklist.fulfilled, (state, action) => {
        return state.filter(player => player.id !== action.payload);
      })
      .addCase(updateUserBlacklist.fulfilled, (state, action) => {
        const index = state.findIndex(player => player.id === action.payload.id);
        if (index !== -1) {
          state[index] = action.payload;
        }
      });
  }
});

export const { setUserBlacklist } = userBlacklistSlice.actions;
export default userBlacklistSlice.reducer;
