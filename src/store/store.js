import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice"; 
import charactersReducer from "./characterSlice"
import authReducer from "./authSlice";

const store = configureStore({
    reducer: {
        users: usersReducer,
        characters: charactersReducer,
        auth: authReducer
    },
});

export default store;