import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from '../../api/url'

const createReaction = createAsyncThunk("createReaction", async (datos) => {
    let headers = { headers: { 'Authorization': `Bearer ${datos.token}` } }
    try{
        const res = await axios.post(`${apiUrl}/api/reactions`, datos.reaction, headers)
        console.log(res)
        return res.data
    }catch(error){
        return {
            payload: error.response.data,
        }
    }
})

const getReactions = createAsyncThunk("getReactions", async (id) => {
    try{
        const res = await axios.get(`${apiUrl}/api/reactions?itineraryId=${id}`)
        return res.data
    }catch(error){
        return {
            payload: error.response.data,
        }
    }
})

const updateReaction = createAsyncThunk("updateReaction", async (datos) => {
    let headers = { headers: { 'Authorization': `Bearer ${datos.token}` } }
    try{
        const res = await axios.put(`${apiUrl}/api/reactions?name=${datos.name}&itineraryId=${datos.id}`, null, headers)
        return res.data
    }catch(error){
        return {
            payload: error.response.data,
        }
    }
})

const reactionActions = {
    createReaction,
    getReactions,
    updateReaction,
}

export default reactionActions
