import { createReducer } from "@reduxjs/toolkit";
import cityActions from "../actions/cityActions";

const { getAllCities , getCitiesFiltred } = cityActions;

const initialState = {
    cities: [],
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
    }
);

export default cityReducer;