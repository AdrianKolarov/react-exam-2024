import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, updateDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";


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


export const fetchGlobalBlacklist = createAsyncThunk(
    'globalBlacklist/fetchGlobalBlacklist',
    async () => {
        const globalBlacklistRef = collection(db, 'globalBlacklist');
        const res = await getDocs(globalBlacklistRef);
        return res.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
);

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
            });
    }
});

export const { setGlobalBlacklist } = globalBlacklistSlice.actions;
export default globalBlacklistSlice.reducer;
