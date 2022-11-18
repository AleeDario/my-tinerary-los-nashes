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


const cityActions = {
    getAllCities,
    getCitiesFiltred
}

export default cityActions