import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from '../../api/url'


const getAllHotels = createAsyncThunk("getAllHotels", async () => {
    try {
        const res = await axios.get(`${apiUrl}/api/hotels`)
        return res.data.response
    } catch (error) {
        console.log(error)
        return {
            payload: 'Error'
        }
    }
})

const getHotelsFiltered = createAsyncThunk("getHotelsFiltered", async (data) => {
    try {
        const res = await axios.get(`${apiUrl}/api/hotels?name=${data.name}&order=${data.order}`)
        const dataReduce = {
            res: res.data.response,
            name: data.name,
            order: data.order
        }
        return dataReduce
    } catch (error) {
        console.log(error)
        return {
            payload: 'Error'
        }
    }
})

const createHotel = createAsyncThunk("createHotel", async (data) => {
    let headers = { headers: { Authorization: `Bearer ${data.token}` } }
    try {
        const res = await axios.post(`${apiUrl}/api/hotels`, data.hotel, headers)

        if (res.data.id) {
            return {
                id: res.data.id,
                success: true,
                response: data.hotel,
            }
        } else {
            return {
                success: false,
                messages: res.data.message,

            }
        }
    } catch (error) {
        return {
            success: false,
            response: 'Something went wrong'
        }
    }
})

const getHotelsAdmin = createAsyncThunk("getHotelsAdmin", async (id) => {
    try {
        const res = await axios.get(`${apiUrl}/api/hotels?userId=${id}`)
        return res.data.response
    } catch (error) {
        console.log(error)
        return {
            payload: 'Error'
        }
    }
})

const deleteHotel = createAsyncThunk("deleteHotel", async (data) => {
    let headers = { headers: { Authorization: `Bearer ${data.token}` } }
    try {
        const res = await axios.delete(`${apiUrl}/api/hotels/${data.id}`, headers)
        return res.data
    } catch (error) {
        console.log(error)
        return {
            payload: 'Error'
        }
    }
})

const updateHotel = createAsyncThunk("updateHotel", async (data) => {
    let headers = { headers: { Authorization: `Bearer ${data.token}` } }
    try {
        const res = await axios.patch(`${apiUrl}/api/hotels/${data.id}`, data.hotels, headers)
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
        return {
            payload: 'Error'
        }
    }
})

const getShows = createAsyncThunk("getShows", async (id) => {
    try {
        const res = await axios.get(`${apiUrl}/api/shows?userId=${id}`)
        return res.data.data
    } catch (error) {
        console.log(error)
        return {
            payload: 'Error'
        }
    }
})

const createShow = createAsyncThunk("createShow", async (data) => {
    let headers = { headers: { Authorization: `Bearer ${data.token}` } }
    try {
        const res = await axios.post(`${apiUrl}/api/shows`, data.show, headers)

        if (res.data.id) {
            return {
                id: res.data.id,
                success: true,
                response: data.show,
            }
        } else {
            return {
                success: false,
                messages: res.data.message,

            }
        }
    } catch (error) {
        return {
            success: false,
            response: 'Something went wrong'
        }
    }
})

const updateShow = createAsyncThunk("updateShow", async (data) => {
    let headers = { headers: { Authorization: `Bearer ${data.token}` } }
    try {
        const res = await axios.patch(`${apiUrl}/api/shows/${data.id}`, data.show, headers)
        return res.data
    } catch (error) {
        console.log(error)
        return {
            payload: 'Error'
        }
    }
})

const deleteShow = createAsyncThunk("deleteShow", async (data) => {
    let headers = { headers: { Authorization: `Bearer ${data.token}` } }
    try {
        const res = await axios.delete(`${apiUrl}/api/shows/${data.id}`, headers)
        return res.data
    } catch (error) {
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
    createShow,
    updateShow,
    deleteShow
}

export default hotelActions