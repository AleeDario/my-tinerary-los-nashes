import { createReducer } from "@reduxjs/toolkit";
import cityActions from "../actions/cityActions";

const { getAllCities , getCitiesFiltred , createCity, getCitiesAdmin, deleteCity, updateCity, getItinerariesAll, getItineraries, updateItinerary, deleteItinerary, createItinerary} = cityActions;

const initialState = {
    cities: [],
    citiesAdmin: [],
    itineraries: [],
    itinerariesAll: [],
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
                    return { ...state, cities: [...state.cities, action.payload.response] };
                }
            })
            .addCase(getCitiesAdmin.fulfilled, (state, action) => {
                return { ...state, citiesAdmin: action.payload};
            })
            .addCase(deleteCity.fulfilled, (state, action) => {
                let city = state.citiesAdmin.filter(city => city._id !== action.payload.data._id)
                return { ...state, citiesAdmin: city , cities: city};
            })
            .addCase(updateCity.fulfilled, (state, action) => {
                let city = state.citiesAdmin.filter(city => city._id !== action.payload.data._id)
                let cities = state.cities.filter(city => city._id !== action.payload.data._id)
                return { ...state, citiesAdmin: [...city, action.payload.data], cities: [...cities, action.payload.data]};
            })
            .addCase(getItinerariesAll.fulfilled, (state, action) => {
                return { ...state, itinerariesAll: action.payload};
            })

            .addCase(getItineraries.fulfilled, (state, action) => {
                if(action.payload.success){
                    return { ...state, itineraries: action.payload.data};
                }else{
                    return { ...state};
                }
            })
            .addCase(createItinerary.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.itineraries.push(action.payload.response)
                }else{
                    return state
                }
            })
            .addCase(updateItinerary.fulfilled, (state, action) => {
                let itinerary = state.itineraries.filter(itinerary => itinerary._id !== action.payload.data._id)
                return { ...state, itineraries: [...itinerary, action.payload.data]};
            })
            .addCase(deleteItinerary.fulfilled, (state, action) => {
                let itinerary = state.itineraries.filter(itinerary => itinerary._id !== action.payload.data._id)
                return { ...state, itineraries: itinerary};
            })
    }
);

export default cityReducer;