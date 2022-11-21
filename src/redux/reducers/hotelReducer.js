import { createReducer } from "@reduxjs/toolkit";
import hotelActions from "../actions/hotelActions";

const { getAllHotels , getHotelsFiltered } = hotelActions;

const initialState = {
    hotels: [],
    order: '',
    name: '',
};

const hotelReducer = createReducer(initialState,
    (builder) => {
        builder
            .addCase(getAllHotels.fulfilled, (state, action) => {
                return { ...state, hotels: action.payload};
            })
            .addCase(getHotelsFiltered.fulfilled, (state, action) => {
                return { ...state, hotels: action.payload.res , order: action.payload.order , name: action.payload.name};
            })
    }
);

export default hotelReducer;