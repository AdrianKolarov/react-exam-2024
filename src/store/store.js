import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice"; 
import charactersReducer from "./characterSlice"
import authReducer from "./authSlice";
import userBlacklistReducer from "./userBlacklistSlice"
import globalBlacklistReducer from "./globalBlacklistSlice"

const store = configureStore({
    reducer: {
        users: usersReducer,
        characters: charactersReducer,
        auth: authReducer,
        userBlacklist: userBlacklistReducer,
        globalBlacklist: globalBlacklistReducer
    },
});

export default store;