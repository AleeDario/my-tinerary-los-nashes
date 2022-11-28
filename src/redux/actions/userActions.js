import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import apiUrl from "../../api/url";

const login = createAsyncThunk('login', async (datos) => {

    try {
        const user = await axios.post(`${apiUrl}/api/auth/sign-in`, datos)
        return {
            success: true,
            response: user.data.response,
            res: user.data,

        }
    } catch (error) {
        return {
            success: false,
            response: error.response.data.message
        }
    }
})

const reLogin = createAsyncThunk('reLogin', async (token) => {
    let headers = { headers: { 'Authorization': `Bearer ${token}` } }
    try {
        let user = await axios.post(`${apiUrl}/api/auth/token`, null, headers)
        return {
            success: true,
            response: {
                user: user.data.response.user,
                token
            }
        }

    } catch (error) {
        return {
            success: false,
            response: error.response.data.message
        }
    }
})

const logout = createAsyncThunk('logout', async (token) => {
    let headers = { headers: { 'Authorization': `Bearer ${token}` }}
    try {
        let user = await axios.post(`${apiUrl}/api/auth/sign-out`, null, headers)
        return {
            success: true,
            response: user.data.message
        }
    } catch (error) {
        return {
            success: false,
            response: error.response.data.message
        }
    }
})

const getUser = createAsyncThunk('getUser', async (id) => {
    try {
        let user = await axios.get(`${apiUrl}/api/auth/me/${id}`)
        return {
            success: true,
            response: user.data.data
        }
    } catch (error) {
        return {
            success: false,
            response: error.response.data.message
        }
    }
})

const updateUser = createAsyncThunk('updateUser', async (info) => {
    try {
        let user = await axios.patch(`${apiUrl}/api/auth/me/${info.id}`, info.user)
        console.log(user)
        return {
            success: true,
            response: user.data.data
        }
    } catch (error) {
        return {
            success: false,
            response: error.response.data.message
        }
    }
})


const userActions = {
    login,
    reLogin,
    logout,
    getUser,
    updateUser
}

export default userActions