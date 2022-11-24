import { createReducer } from "@reduxjs/toolkit";
import cityActions from "../actions/cityActions";

const { getAllCities , getCitiesFiltred , createCity, getCitiesAdmin, deleteCity, updateCity, getItineraries, updateItinerary, deleteItinerary} = cityActions;

const initialState = {
    cities: [],
    citiesAdmin: [],
    itineraries: [],
    checks: '',
    name: '',
    continent: [],
    checked: [],
};

const cityReducer = createReducer(initialState,
    (builder) => {
        builder
            .addCase(getAllCities.fulfilled, (state, action) => {
                let continentes = [...new Set(action.payload.map(city => city.continent))]
                return { ...state, cities: action.payload , continent: continentes};
            })
            .addCase(getCitiesFiltred.fulfilled, (state, action) => {
                return { ...state, cities: action.payload.res , checks: action.payload.checks , name: action.payload.name ,checked: action.payload.checked};
            })
            .addCase(createCity.fulfilled,(state, action) => {
                if (action.payload.success) {
                    state.cities.push(action.payload)
                }
            })
            .addCase(getCitiesAdmin.fulfilled, (state, action) => {
                return { ...state, citiesAdmin: action.payload};
            })
            .addCase(deleteCity.fulfilled, (state, action) => {
                let city = state.citiesAdmin.filter(city => city.id !== action.payload.data._id)
                return { ...state, citiesAdmin: city};
            })
            .addCase(updateCity.fulfilled, (state, action) => {
                return { ...state};
            })
            .addCase(getItineraries.fulfilled, (state, action) => {
                return { ...state, itineraries: action.payload};
            })
            .addCase(updateItinerary.fulfilled, (state, action) => {
                return { ...state};
            })
            .addCase(deleteItinerary.fulfilled, (state, action) => {
                let itinerary = state.itineraries.filter(itinerary => itinerary._id !== action.payload.data._id)
                return { ...state, itineraries: itinerary};
            })
    }
);

export default cityReducer;