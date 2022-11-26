import { createReducer } from "@reduxjs/toolkit";
import userActions from "../actions/userActions";

const { login, reLogin } = userActions;

const initialState = {
    name: '',
    email: '',
    photo: '',
    role: '',
    online: false,
    token: '',
};

const userReducers = createReducer(initialState, (builder) => {
    builder
        .addCase(login.fulfilled, (state, action) => {
            const { success, response } = action.payload;
            if (success) {
                let { user, token } = response
                localStorage.setItem("token", JSON.stringify({ token: { user: token } }))
                return { ...state, name: user.name, email: user.email, photo: user.photo, role: user.role, online: true, token: token }
            } else {
                return { ...state, mensaje: response }
            }
        })
        .addCase(reLogin.fulfilled, (state, action) => {
            const { success, response } = action.payload;
            let { user, token } = response
            if (success) {
                return { ...state, name: user.name, email: user.email, photo: user.photo, role: user.role, online: true, token: token }
            } else {
                return { ...state, mensaje: response }
            }
        });
})

export default userReducers