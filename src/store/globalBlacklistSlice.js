import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, updateDoc, doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/config";

// Thunk for updating global blacklist
export const updateGlobalBlacklist = createAsyncThunk(
    'globalBlacklist/updateGlobalBlacklist',
    async (player) => {
        const globalBlacklistRef = doc(db, 'globalBlacklist', player.name);
        const globalDoc = await getDoc(globalBlacklistRef);

        if (globalDoc.exists()) {
            const globalData = globalDoc.data();
            const updatedCount = globalData.count + 1;

            await updateDoc(globalBlacklistRef, {
                count: updatedCount
            });
            return { ...player, count: updatedCount };

        } else {
            const newDocData = {
                name: player.name,
                count: 1
            };

            await setDoc(globalBlacklistRef, newDocData);

            return { ...player, count: 1 };
        }
    }
);

// Thunk for fetching global blacklist
export const fetchGlobalBlacklist = createAsyncThunk(
    'globalBlacklist/fetchGlobalBlacklist',
    async () => {
        const globalBlacklistRef = collection(db, 'globalBlacklist');
        const res = await getDocs(globalBlacklistRef);
        return res.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
);

// Thunk for removing from global blacklist
export const removeFromGlobalBlacklist = createAsyncThunk(
    'globalBlacklist/removeFromGlobalBlacklist',
    async (playerName) => {
        const globalBlacklistRef = doc(db, 'globalBlacklist', playerName);
        const globalDoc = await getDoc(globalBlacklistRef);

        if (globalDoc.exists()) {
            const globalData = globalDoc.data();

            if (globalData.count > 1) {
                const updatedCount = globalData.count - 1;

                await updateDoc(globalBlacklistRef, {
                    count: updatedCount
                });

                return { name: playerName, count: updatedCount };
            } else {
                await deleteDoc(globalBlacklistRef);
                return { name: playerName, count: 0 };
            }
        }
    }
);

// Slice for global blacklist
const globalBlacklistSlice = createSlice({
    name: 'globalBlacklist',
    initialState: [],
    reducers: {
        setGlobalBlacklist: (state, action) => {
            return action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGlobalBlacklist.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(updateGlobalBlacklist.fulfilled, (state, action) => {
                const existingPlayerIndex = state.findIndex(player => player.name === action.payload.name);

                if (existingPlayerIndex !== -1) {
                    state[existingPlayerIndex] = {
                        ...state[existingPlayerIndex],
                        count: action.payload.count
                    };
                } else {
                    state.push(action.payload);
                }
            })
            .addCase(removeFromGlobalBlacklist.fulfilled, (state, action) => {
                const existingPlayerIndex = state.findIndex(player => player.name === action.payload.name);

                if (existingPlayerIndex !== -1) {
                    if (action.payload.count === 0) {
                        state.splice(existingPlayerIndex, 1);
                    } else {
                        state[existingPlayerIndex] = {
                            ...state[existingPlayerIndex],
                            count: action.payload.count
                        };
                    }
                }
            });
    }
});

export const { setGlobalBlacklist } = globalBlacklistSlice.actions;
export default globalBlacklistSlice.reducer;
