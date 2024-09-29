import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    macro: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setMacro: (state,action) => {
            state.macro = action.payload.macro
        }
        //set login is already done in firebase 
    },
});

export const {setMacro} = userSlice.actions;
export default userSlice.reducer;