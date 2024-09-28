import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    res: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        //set login is already done in firebase 
    },
});

export const {} = userSlice.actions;
export default userSlice.reducer;