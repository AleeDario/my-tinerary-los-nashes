import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from '../../api/url'

const getAllCities = createAsyncThunk("getAllCities", async () => {
    try{
        const res = await axios.get(`${apiUrl}/api/cities`)
        return res.data.data
    }catch(error){
        console.log(error)
        return {
            payload: 'Error'
        }
    }
})

const getCitiesFiltred = createAsyncThunk("getCitiesFiltred", async (data) => {
    try{
        const res = await axios.get(`${apiUrl}/api/cities?${data.checks}&name=${data.name}`)
        const dataReduce = {
            res: res.data.data,
            checks: data.checks,
            name: data.name,
            checked: data.checked,
        }
        return dataReduce
    }catch(error){
        console.log(error)
        return {
            payload: 'Error'
        }
    }
})

const createCity = createAsyncThunk("createCity", async (newCity) => {
    try{
        const res = await axios.post(`${apiUrl}/api/cities`, newCity)

        if (res.data.id) {
            return {
                id: res.data.id,
                success: true,
                response: newCity,
            }
        } else {
            return {
                success: false,
                messages: res.data.message,
                
            }
        }
    }catch(error){
        return {
            success: false,
            response: 'Ocurrio un error'
        }
    }
})

const getCitiesAdmin = createAsyncThunk("getCitiesAdmin", async (id) => {
    try{
        const res = await axios.get(`${apiUrl}/api/cities?userId=${id}`)
        return res.data.data
    }catch(error){
        console.log(error)
        return {
            payload: 'Error'
        }
    }
})

const deleteCity = createAsyncThunk("deleteCity", async (id) => {
    try{
        const res = await axios.delete(`${apiUrl}/api/cities/${id}`)
        return res.data
    }catch(error){
        console.log(error)
        return {
            payload: 'Error'
        }
    }
})

const updateCity = createAsyncThunk("updateCity", async (data) => {
    try{
        const res = await axios.put(`${apiUrl}/api/cities/${data.id}`, data.citie)
        return res.data
    }catch(error){
        console.log(error)
        return {
            payload: 'Error'
        }
    }
})

const cityActions = {
    getAllCities,
    getCitiesFiltred,
    createCity,
    getCitiesAdmin,
    deleteCity,
    updateCity
}

export default cityActions