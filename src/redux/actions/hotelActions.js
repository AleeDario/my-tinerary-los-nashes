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

const createHotel = createAsyncThunk("createHotel", async (newHotel) => {
    try{
        const res = await axios.post(`${apiUrl}/api/hotels`, newHotel)

        if (res.data.id) {
            return {
                id: res.data.id,
                success: true,
                response: newHotel,
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
            response: 'Something went wrong'
        }
    }
})

const getHotelsAdmin = createAsyncThunk("getHotelsAdmin", async (id) => {
    try{
        const res = await axios.get(`${apiUrl}/api/hotels?userId=${id}`)
        return res.data.response
    }catch(error){
        console.log(error)
        return {
            payload: 'Error'
        }
    }
})

const deleteHotel = createAsyncThunk("deleteHotel", async (id) => {
    try{
        const res = await axios.delete(`${apiUrl}/api/hotels/${id}`)
        return res.data
    }catch(error){
        console.log(error)
        return {
            payload: 'Error'
        }
    }
})

const updateHotel = createAsyncThunk("updateHotel", async (data) => {
    try{
        const res = await axios.patch(`${apiUrl}/api/hotels/${data.id}`, data.hotels)
        console.log(res.data)
        return res.data
    }catch(error){
        console.log(error)
        return {
            payload: 'Error'
        }
    }
})

const getShows = createAsyncThunk("getShows", async (id) => {
    try{
        const res = await axios.get(`${apiUrl}/api/shows?userId=${id}`)
        return res.data.data
    }catch(error){
        console.log(error)
        return {
            payload: 'Error'
        }
    }
})

const updateShow = createAsyncThunk("updateShow", async (data) => {
    try{
        const res = await axios.patch(`${apiUrl}/api/shows/${data.id}`, data.show)
        return res.data
    }catch(error){
        console.log(error)
        return {
            payload: 'Error'
        }
    }
})

const deleteShow = createAsyncThunk("deleteShow", async (id) => {
    try{
        const res = await axios.delete(`${apiUrl}/api/shows/${id}`)
        return res.data
    }catch(error){
        console.log(error)
        return {
            payload: 'Error'
        }
    }
})


const hotelActions = {
    getAllHotels,
    getHotelsFiltered,
    createHotel,
    getHotelsAdmin,
    deleteHotel,
    updateHotel,
    getShows,
    updateShow,
    deleteShow
}

export default hotelActions