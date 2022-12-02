import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from '../../api/url'

const getComments = createAsyncThunk("getComments", async (datos) => {
    let headers = { headers: { 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODExY2YwZmY5MmM4NTgxNjRmNDVhNSIsImlhdCI6MTY2OTgyMDUzMywiZXhwIjoxNzAxMzU2NTMzfQ.eqXTdxtfE81LIhTUGiFs92wUoJkQVsOol7OHvaPBckI` } }
    try {
        if (datos.type === 'show') {
            const res = await axios.get(`${apiUrl}/api/comments?showId=${datos.eventId}&order=desc`, headers)
            return res.data
        } else if (datos.type === 'itinerary') {
            const res = await axios.get(`${apiUrl}/api/comments?itineraryId=${datos.eventId}&order=desc`, headers)
            return res.data
        }
    } catch (error) {
        return {
            payload: error.response.data,
        }
    }
});



const createComment = createAsyncThunk("createComment", async (datos) => {
    let headers = { headers: { 'Authorization': `Bearer ${datos.token}` } }
    try {
        const res = await axios.post(`${apiUrl}/api/comments`, datos.comment, headers)
        return res.data
    } catch (error) {
        return {
            payload: error.response.data,
        }
    }
});

const updateComment = createAsyncThunk("updateComment", async (datos) => {
    let headers = { headers: { 'Authorization': `Bearer ${datos.token}` } }
    try {
        const res = await axios.put(`${apiUrl}/api/comments/${datos.id}`, datos.comment, headers)
        return res.data
    } catch (error) {
        return {
            payload: error.response.data,
        }
    }
})

const deleteComment = createAsyncThunk("deleteComment", async (datos) => {
    let headers = { headers: { 'Authorization': `Bearer ${datos.token}` } }
    console.log(datos.id)
    try {
        const res = await axios.delete(`${apiUrl}/api/comments/${datos.id}`, headers)
        return res.data
    } catch (error) {
        return {
            payload: error.response.data,
        }
    }
})

const commentActions = {
    getComments,
    createComment,
    updateComment,
    deleteComment
}

export default commentActions