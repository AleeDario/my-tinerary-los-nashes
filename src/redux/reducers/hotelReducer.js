import { createReducer } from "@reduxjs/toolkit";
import hotelActions from "../actions/hotelActions";

const { getAllHotels , getHotelsFiltered, createHotel, getHotelsAdmin, deleteHotel, updateHotel, getShows, createShow, updateShow, deleteShow } = hotelActions;

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
                    return { ...state, hotels: [...state.hotels, action.payload.response]};
                }
            })
            .addCase(getHotelsAdmin.fulfilled, (state, action) => {
                return { ...state, hotelsAdmin: action.payload};
            })
            .addCase(deleteHotel.fulfilled, (state, action) => {
                let hotel = state.hotelsAdmin.filter(hotel => hotel._id !== action.payload.data._id)
                return { ...state, hotelsAdmin: hotel, hotels: hotel};
            })
            .addCase(updateHotel.fulfilled, (state, action) => {
                let hotel = state.hotelsAdmin.filter(hotel => hotel._id !== action.payload.data._id)
                let hotels = state.hotels.filter(hotel => hotel._id !== action.payload.data._id)
                return { ...state, hotelsAdmin: [...hotel, action.payload.data], hotels: [...hotels, action.payload.data]};
            })
            .addCase(getShows.fulfilled, (state, action) => {
                return { ...state, shows: action.payload};
            })
            .addCase(createShow.fulfilled, (state, action) => {
                if (action.payload.success) {
                    return { ...state, shows: [...state.shows, action.payload.response]};
                }
            })
            .addCase(updateShow.fulfilled, (state, action) => {
                let show = state.shows.filter(show => show._id !== action.payload.data._id)
                return { ...state, shows: [...show, action.payload.data]};
            })
            .addCase(deleteShow.fulfilled, (state, action) => {
                let show = state.shows.filter(show => show._id !== action.payload.data._id)
                return { ...state, shows: show};
            })

    }
);

export default hotelReducer;