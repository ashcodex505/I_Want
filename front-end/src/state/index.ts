import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    macro: null,
    restaurants: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setMacro: (state,action) => {
            state.macro = action.payload.macro
        },
        setRestaurants: (state,action) => {
            state.restaurants = action.payload
        }
        //set login is already done in firebase 
    },
});

export const {setMacro, setRestaurants} = userSlice.actions;
export default userSlice.reducer;