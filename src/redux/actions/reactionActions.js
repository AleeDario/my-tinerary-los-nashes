import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from '../../api/url'

const createReaction = createAsyncThunk("createReaction", async (datos) => {
    let headers = { headers: { 'Authorization': `Bearer ${datos.token}` } }
    try {
        const res = await axios.post(`${apiUrl}/api/reactions`, datos.reaction, headers)
        return res.data
    } catch (error) {
        return {
            payload: error.response.data,
        }
    }
})

const getReactions = createAsyncThunk("getReactions", async (datos) => {
    let headers = { headers: { 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODExY2YwZmY5MmM4NTgxNjRmNDVhNSIsImlhdCI6MTY2OTgyMDUzMywiZXhwIjoxNzAxMzU2NTMzfQ.eqXTdxtfE81LIhTUGiFs92wUoJkQVsOol7OHvaPBckI` } }
    try {
        if (datos.type === 'show') {
            const res = await axios.get(`${apiUrl}/api/reactions?showId=${datos.eventId}`, headers)
            return res.data
        } else if (datos.type === 'itinerary') {
            const res = await axios.get(`${apiUrl}/api/reactions?itineraryId=${datos.eventId}`, headers)
            return res.data
        }
    } catch (error) {
        return {
            payload: error.response.data,
        }
    }
})

const updateReaction = createAsyncThunk("updateReaction", async (datos) => {
    let headers = { headers: { 'Authorization': `Bearer ${datos.token}` } }
    try {
        if (datos.type === 'show') {
            const res = await axios.put(`${apiUrl}/api/reactions?name=${datos.name}&showId=${datos.id}`, null, headers)
            return res.data
        } else if (datos.type === 'itinerary') {
            const res = await axios.put(`${apiUrl}/api/reactions?name=${datos.name}&itineraryId=${datos.id}`, null, headers)
            return res.data
        }
    } catch (error) {
        return {
            payload: error.response.data,
        }
    }
})

const getMyReactions = createAsyncThunk("getMyReactions", async ({ id, token }) => {
    let headers = { headers: { 'Authorization': `Bearer ${token}` } }
    try {
        const res = await axios.get(`${apiUrl}/api/reactions?userId=${id}`, headers)
        return res.data.data
    } catch (error) {
        return {
            payload: error.response.data,
        }
    }
})

const deleteReaction = createAsyncThunk("deleteReaction", async ({ id, token }) => {
    let headers = { headers: { 'Authorization': `Bearer ${token}` } }
    try {
        const res = await axios.put(`${apiUrl}/api/reactions/${id}`, null, headers)
        return res.data
    } catch (error) {
        return {
            payload: error.response.data,
        }
    }
})

const reactionActions = {
    createReaction,
    getReactions,
    updateReaction,
    getMyReactions,
    deleteReaction
}

export default reactionActions
