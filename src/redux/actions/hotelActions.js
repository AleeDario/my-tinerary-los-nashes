import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from '../../api/url'


const getAllHotels = createAsyncThunk("getAllHotels", async () => {
    try{
        const res = await axios.get(`${apiUrl}/api/hotels`)
        return res.data.response
    }catch(error){
        console.log(error)
        return {
            payload: 'Error'
        }
    }
})

const getHotelsFiltered = createAsyncThunk("getHotelsFiltered", async (data) => {
    try{
        const res = await axios.get(`${apiUrl}/api/hotels?name=${data.name}&order=${data.order}`)
        const dataReduce = {
            res: res.data.response,
            name: data.name,
            order: data.order
        }
        return dataReduce
    }catch(error){
        console.log(error)
        return {
            payload: 'Error'
        }
    }
})

const hotelActions = {
    getAllHotels,
    getHotelsFiltered
}

export default hotelActions