import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        createUser: (state) => {
            state.user = null;
        },
    },
});

export const { setUser, createUser } = userSlice.actions;
export default userSlice.reducer;