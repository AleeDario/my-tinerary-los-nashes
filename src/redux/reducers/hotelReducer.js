import { createReducer } from "@reduxjs/toolkit";
import hotelActions from "../actions/hotelActions";

const { getAllHotels , getHotelsFiltered, createHotel, getHotelsAdmin, deleteHotel, updateHotel, getShows, updateShow, deleteShow } = hotelActions;

const initialState = {
    hotels: [],
    hotelsAdmin: [],
    shows: [],
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
            .addCase(createHotel.fulfilled,(state, action) => {
                if (action.payload.success) {
                    state.hotels.push(action.payload)
                }
            })
            .addCase(getHotelsAdmin.fulfilled, (state, action) => {
                return { ...state, hotelsAdmin: action.payload};
            })
            .addCase(deleteHotel.fulfilled, (state, action) => {
                let hotel = state.hotelsAdmin.filter(hotel => hotel.id !== action.payload.data._id)
                return { ...state, hotelsAdmin: hotel};
            })
            .addCase(updateHotel.fulfilled, (state, action) => {
                return { ...state};
            })
            .addCase(getShows.fulfilled, (state, action) => {
                return { ...state, shows: action.payload};
            })
            .addCase(updateShow.fulfilled, (state, action) => {
                return { ...state};
            })
            .addCase(deleteShow.fulfilled, (state, action) => {
                let show = state.shows.filter(show => show._id !== action.payload.data._id)
                return { ...state, shows: show};
            })

    }
);

export default hotelReducer;