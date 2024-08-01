import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs, limit, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase/config";


export const addCharacter = createAsyncThunk(`characters/addCharacter`, async (character, { getState }) => {
    const userId = getState().auth.userId
    const docRef = await addDoc(collection(db,'users', userId, 'characters'), character)
    return { ...character, id:docRef.id}
})

export const fetchCharacters = createAsyncThunk('characters/fetchCharacters', async(_,{ getState }) =>{
    const userId = getState().auth.userId
    const res = await getDocs(collection(db,'users', userId, 'characters'), limit(10))
    return res.docs.map(doc=>({...doc.data(), id:doc.id}))
})

export const deleteCharacter = createAsyncThunk('characters/deleteCharacter', async(id)=>{
    await deleteDoc(doc(db, 'users', auth.currentUser.uid, 'characters', id))
    return id
})

const characterSlice = createSlice({
    name: 'characters',
    initialState: {
        items: [],
        selectedCharacter: null,
        status: 'idle',
        error: null
    },
    reducers: {
        selectCharacter: (state, action) => {
            state.selectedCharacter = action.payload
        },
        resetSelectedCharacter: (state) => {
            state.selectedCharacter = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCharacters.pending, (state) =>{
                state.status = 'loading'
            })
            .addCase(fetchCharacters.fulfilled, (state, action) =>{
                state.status = 'succeeded'
                state.items = action.payload
            })
            .addCase(fetchCharacters.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addCharacter.fulfilled, (state, action) =>{
                state.items.push(action.payload)
            })
            .addCase(deleteCharacter.fulfilled, (state, action)=>{
                state.items = state.items.filter(character => character.id !== action.payload)
            })
    }
})

export const { selectCharacter, resetSelectedCharacter  } = characterSlice.actions

export default characterSlice.reducer
