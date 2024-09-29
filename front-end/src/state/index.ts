import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    macro: null,
    restaurants: null,
    restaurant: null,
    meals: null
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
        },
        setMeals: (state, action) => {
            state.meals = action.payload
        },
        setRestaurant: (state, action) => {
            state.restaurant = action.payload
        }
        //set login is already done in firebase 
    },
});

export const {setMacro, setRestaurants, setMeals, setRestaurant} = userSlice.actions;
export default userSlice.reducer;