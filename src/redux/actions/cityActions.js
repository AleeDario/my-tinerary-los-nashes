import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from '../../api/url'

const getAllCities = createAsyncThunk("getAllCities", async (data) => {
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


const cityActions = {
    getAllCities,
    getCitiesFiltred,
    createCity
}

export default cityActions