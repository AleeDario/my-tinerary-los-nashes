import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import userActions from '../redux/actions/userActions';
import Swal from 'sweetalert2'

export default function MyProfile() {

    const dispatch = useDispatch()
    const { getUser, updateUser } = userActions
    const { user, id } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getUser(id))
        // eslint-disable-next-line
    }, [])

    function updatePhoto() {

        Swal.fire({
            title: 'Update your photo',
            input: 'text',
            inputLabel: 'Your new photo url',
            inputPlaceholder: 'Enter your new photo url',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to write something!'
                }
            }
        })
            .then(async (result) => {
                if (result.isConfirmed) {

                    let userUpdated = {
                        id: user._id,
                        user: {
                            photo: result.value
                        }
                    }
                    dispatch(updateUser(userUpdated))
                }
            }
            )
    }

    function updateName() {

        Swal.fire({
            title: 'Update your name',
            input: 'text',
            inputLabel: 'Your name',
            inputPlaceholder: 'Enter your name',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to write something!'
                }
            }
        })
            .then(async (result) => {
                if (result.isConfirmed) {

                    let userUpdated = {
                        id: user._id,
                        user: {
                            name: result.value
                        }
                    }
                    dispatch(updateUser(userUpdated))
                }
            }
            )
    }

    function updateLastName() {
        Swal.fire({
            title: 'Update your last name',
            input: 'text',
            inputLabel: 'Your last name',
            inputPlaceholder: 'Enter your last name',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to write something!'
                }
            }
        })
            .then(async (result) => {
                if (result.isConfirmed) {

                    let userUpdated = {
                        id: user._id,
                        user: {
                            lastName: result.value
                        }
                    }
                    dispatch(updateUser(userUpdated))
                }
            }
            )
    }

    function updateEmail() {

        Swal.fire({
            title: 'Update your Email',
            input: 'text',
            inputLabel: 'Your Email',
            inputPlaceholder: 'Enter your Email',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to write something!'
                }
            }
        })
            .then(async (result) => {
                if (result.isConfirmed) {

                    let userUpdated = {
                        id: user._id,
                        user: {
                            email: result.value
                        }
                    }
                    dispatch(updateUser(userUpdated))
                }
            }
            )

    }

    function updateAge() {
        Swal.fire({
            title: 'Update your age',
            input: 'number',
            inputLabel: 'Your age',
            inputPlaceholder: 'Enter your age',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to write something!'
                }
            }
        })
            .then(async (result) => {
                if (result.isConfirmed) {

                    let userUpdated = {
                        id: user._id,
                        user: {
                            age: result.value
                        }
                    }
                    dispatch(updateUser(userUpdated))
                }
            }
            )
    }

    function updatePassword(e) {
        e.preventDefault()
        Swal.fire({
            title: 'Update your password',
            input: 'password',
            inputLabel: 'Your password',
            inputPlaceholder: 'Enter your password',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to write something!'
                }
            }
        })
            .then(async (result) => {
                if (result.isConfirmed) {

                    let userUpdated = {
                        id: user._id,
                        user: {
                            password: result.value
                        }
                    }
                    dispatch(updateUser(userUpdated))
                }
            }
            )
    }


    return (
        <main className="w-100 flex column align-center p-3 gap-2 main-container-sign">
            <img className='imgFondo img-fluid' src='../img/fondo.jpg' alt='fondo-img' />
            <div className="flex justify-center">
                <form>
                    <div className="cardForm flex column align-center justify-center container-fluid p-2">
                        <h1 className="text-palette2 titleForm">My Profile</h1>
                        <div className='flex cardFormPerfil container-fluid gap-1-5'>
                            <div className='flex'>
                                <img width='350px' className="flex align-center img-fluid" src={user.photo} alt="drawing" />
                                <div>
                                    <svg onClick={updatePhoto} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="40px" version="1.1" viewBox="0 0 700 700">
                                        <g>
                                            <path d="m515.03 39.234c-2.5078 0.27344-4.8516 1.3828-6.6523 3.1523l-253.4 253.4c-1.8711 1.8203-3.0469 4.2344-3.3242 6.8242l-7.875 71.227c-0.39844 3.4023 0.78125 6.7969 3.2031 9.2188 2.4219 2.4219 5.8203 3.6055 9.2188 3.207l71.227-8.0508c2.5078-0.26953 4.8516-1.3828 6.6484-3.1484l253.4-253.4c2.125-2.1016 3.3242-4.9688 3.3242-7.9609 0-2.9922-1.1992-5.8594-3.3242-7.9648l-63.348-63.352-0.003906 0.003907c-2.4023-2.3672-5.7461-3.5234-9.0977-3.1523zm1.2266 26.949 47.602 47.602-15.75 15.75-47.602-47.602zm-395.85 29.051c-6.5703 0.20312-11.062 6.1562-11.199 11.199v403.2c0 5.8633 5.3359 11.199 11.199 11.199h403.2c5.8633 0 11.199-5.3359 11.199-11.199v-240.8c0.085938-5.918-5.2812-11.375-11.199-11.375-5.918 0-11.285 5.457-11.199 11.375v229.6h-380.8v-380.8h229.6c5.918 0.082032 11.375-5.2812 11.375-11.199 0-5.918-5.457-11.285-11.375-11.199zm364.18 2.625 47.602 47.602-201.95 201.95-47.602-47.602zm-212.45 223.12 36.75 36.75-41.301 4.5508z" />
                                            <use x="70" y="644" xlinkHref="#u" />
                                            <use x="90.546875" y="644" xlinkHref="#b" />
                                            <use x="104.355469" y="644" xlinkHref="#a" />
                                            <use x="123.347656" y="644" xlinkHref="#l" />
                                            <use x="142.242188" y="644" xlinkHref="#d" />
                                            <use x="155.625" y="644" xlinkHref="#a" />
                                            <use x="174.617188" y="644" xlinkHref="#k" />
                                            <use x="204.40625" y="644" xlinkHref="#j" />
                                            <use x="224.449219" y="644" xlinkHref="#i" />
                                            <use x="252.449219" y="644" xlinkHref="#h" />
                                            <use x="262.046875" y="644" xlinkHref="#g" />
                                            <use x="278.648438" y="644" xlinkHref="#c" />
                                            <use x="297.882812" y="644" xlinkHref="#f" />
                                            <use x="317.816406" y="644" xlinkHref="#t" />
                                            <use x="334.484375" y="644" xlinkHref="#s" />
                                            <use x="354.523438" y="644" xlinkHref="#e" />
                                            <use x="374.460938" y="644" xlinkHref="#a" />
                                            <use x="393.449219" y="644" xlinkHref="#b" />
                                            <use x="407.257812" y="644" xlinkHref="#a" />
                                            <use x="70" y="672" xlinkHref="#r" />
                                            <use x="82.183594" y="672" xlinkHref="#b" />
                                            <use x="95.992188" y="672" xlinkHref="#c" />
                                            <use x="115.226562" y="672" xlinkHref="#q" />
                                            <use x="154.152344" y="672" xlinkHref="#d" />
                                            <use x="167.535156" y="672" xlinkHref="#e" />
                                            <use x="187.46875" y="672" xlinkHref="#a" />
                                            <use x="216.207031" y="672" xlinkHref="#p" />
                                            <use x="239.640625" y="672" xlinkHref="#c" />
                                            <use x="258.878906" y="672" xlinkHref="#o" />
                                            <use x="278.8125" y="672" xlinkHref="#f" />
                                            <use x="308.492188" y="672" xlinkHref="#n" />
                                            <use x="329.015625" y="672" xlinkHref="#b" />
                                            <use x="342.820312" y="672" xlinkHref="#c" />
                                            <use x="362.058594" y="672" xlinkHref="#m" />
                                            <use x="371.65625" y="672" xlinkHref="#a" />
                                            <use x="390.648438" y="672" xlinkHref="#g" />
                                            <use x="407.242188" y="672" xlinkHref="#d" />
                                        </g>
                                    </svg>
                                </div>
                            </div>
                            <div className='flex column gap-1 justify-center align-center container-fluid'>
                                <div className="flex column gap-3">
                                    <div className='flex column gap-1'>
                                        <div className='flex gap-1 align-center'>
                                            <h2 className='textPerfil'>Name: {user.name}</h2>
                                            <svg onClick={updateName} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="40px" version="1.1" viewBox="0 0 700 700">
                                                <g>
                                                    <path d="m515.03 39.234c-2.5078 0.27344-4.8516 1.3828-6.6523 3.1523l-253.4 253.4c-1.8711 1.8203-3.0469 4.2344-3.3242 6.8242l-7.875 71.227c-0.39844 3.4023 0.78125 6.7969 3.2031 9.2188 2.4219 2.4219 5.8203 3.6055 9.2188 3.207l71.227-8.0508c2.5078-0.26953 4.8516-1.3828 6.6484-3.1484l253.4-253.4c2.125-2.1016 3.3242-4.9688 3.3242-7.9609 0-2.9922-1.1992-5.8594-3.3242-7.9648l-63.348-63.352-0.003906 0.003907c-2.4023-2.3672-5.7461-3.5234-9.0977-3.1523zm1.2266 26.949 47.602 47.602-15.75 15.75-47.602-47.602zm-395.85 29.051c-6.5703 0.20312-11.062 6.1562-11.199 11.199v403.2c0 5.8633 5.3359 11.199 11.199 11.199h403.2c5.8633 0 11.199-5.3359 11.199-11.199v-240.8c0.085938-5.918-5.2812-11.375-11.199-11.375-5.918 0-11.285 5.457-11.199 11.375v229.6h-380.8v-380.8h229.6c5.918 0.082032 11.375-5.2812 11.375-11.199 0-5.918-5.457-11.285-11.375-11.199zm364.18 2.625 47.602 47.602-201.95 201.95-47.602-47.602zm-212.45 223.12 36.75 36.75-41.301 4.5508z" />
                                                    <use x="70" y="644" xlinkHref="#u" />
                                                    <use x="90.546875" y="644" xlinkHref="#b" />
                                                    <use x="104.355469" y="644" xlinkHref="#a" />
                                                    <use x="123.347656" y="644" xlinkHref="#l" />
                                                    <use x="142.242188" y="644" xlinkHref="#d" />
                                                    <use x="155.625" y="644" xlinkHref="#a" />
                                                    <use x="174.617188" y="644" xlinkHref="#k" />
                                                    <use x="204.40625" y="644" xlinkHref="#j" />
                                                    <use x="224.449219" y="644" xlinkHref="#i" />
                                                    <use x="252.449219" y="644" xlinkHref="#h" />
                                                    <use x="262.046875" y="644" xlinkHref="#g" />
                                                    <use x="278.648438" y="644" xlinkHref="#c" />
                                                    <use x="297.882812" y="644" xlinkHref="#f" />
                                                    <use x="317.816406" y="644" xlinkHref="#t" />
                                                    <use x="334.484375" y="644" xlinkHref="#s" />
                                                    <use x="354.523438" y="644" xlinkHref="#e" />
                                                    <use x="374.460938" y="644" xlinkHref="#a" />
                                                    <use x="393.449219" y="644" xlinkHref="#b" />
                                                    <use x="407.257812" y="644" xlinkHref="#a" />
                                                    <use x="70" y="672" xlinkHref="#r" />
                                                    <use x="82.183594" y="672" xlinkHref="#b" />
                                                    <use x="95.992188" y="672" xlinkHref="#c" />
                                                    <use x="115.226562" y="672" xlinkHref="#q" />
                                                    <use x="154.152344" y="672" xlinkHref="#d" />
                                                    <use x="167.535156" y="672" xlinkHref="#e" />
                                                    <use x="187.46875" y="672" xlinkHref="#a" />
                                                    <use x="216.207031" y="672" xlinkHref="#p" />
                                                    <use x="239.640625" y="672" xlinkHref="#c" />
                                                    <use x="258.878906" y="672" xlinkHref="#o" />
                                                    <use x="278.8125" y="672" xlinkHref="#f" />
                                                    <use x="308.492188" y="672" xlinkHref="#n" />
                                                    <use x="329.015625" y="672" xlinkHref="#b" />
                                                    <use x="342.820312" y="672" xlinkHref="#c" />
                                                    <use x="362.058594" y="672" xlinkHref="#m" />
                                                    <use x="371.65625" y="672" xlinkHref="#a" />
                                                    <use x="390.648438" y="672" xlinkHref="#g" />
                                                    <use x="407.242188" y="672" xlinkHref="#d" />
                                                </g>
                                            </svg>
                                        </div>
                                        <div className='flex gap-1'>
                                            <h2 className='textPerfil'>Last Name: {user.lastName}</h2>
                                            <svg onClick={updateLastName} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="40px" version="1.1" viewBox="0 0 700 700">
                                                <g>
                                                    <path d="m515.03 39.234c-2.5078 0.27344-4.8516 1.3828-6.6523 3.1523l-253.4 253.4c-1.8711 1.8203-3.0469 4.2344-3.3242 6.8242l-7.875 71.227c-0.39844 3.4023 0.78125 6.7969 3.2031 9.2188 2.4219 2.4219 5.8203 3.6055 9.2188 3.207l71.227-8.0508c2.5078-0.26953 4.8516-1.3828 6.6484-3.1484l253.4-253.4c2.125-2.1016 3.3242-4.9688 3.3242-7.9609 0-2.9922-1.1992-5.8594-3.3242-7.9648l-63.348-63.352-0.003906 0.003907c-2.4023-2.3672-5.7461-3.5234-9.0977-3.1523zm1.2266 26.949 47.602 47.602-15.75 15.75-47.602-47.602zm-395.85 29.051c-6.5703 0.20312-11.062 6.1562-11.199 11.199v403.2c0 5.8633 5.3359 11.199 11.199 11.199h403.2c5.8633 0 11.199-5.3359 11.199-11.199v-240.8c0.085938-5.918-5.2812-11.375-11.199-11.375-5.918 0-11.285 5.457-11.199 11.375v229.6h-380.8v-380.8h229.6c5.918 0.082032 11.375-5.2812 11.375-11.199 0-5.918-5.457-11.285-11.375-11.199zm364.18 2.625 47.602 47.602-201.95 201.95-47.602-47.602zm-212.45 223.12 36.75 36.75-41.301 4.5508z" />
                                                    <use x="70" y="644" xlinkHref="#u" />
                                                    <use x="90.546875" y="644" xlinkHref="#b" />
                                                    <use x="104.355469" y="644" xlinkHref="#a" />
                                                    <use x="123.347656" y="644" xlinkHref="#l" />
                                                    <use x="142.242188" y="644" xlinkHref="#d" />
                                                    <use x="155.625" y="644" xlinkHref="#a" />
                                                    <use x="174.617188" y="644" xlinkHref="#k" />
                                                    <use x="204.40625" y="644" xlinkHref="#j" />
                                                    <use x="224.449219" y="644" xlinkHref="#i" />
                                                    <use x="252.449219" y="644" xlinkHref="#h" />
                                                    <use x="262.046875" y="644" xlinkHref="#g" />
                                                    <use x="278.648438" y="644" xlinkHref="#c" />
                                                    <use x="297.882812" y="644" xlinkHref="#f" />
                                                    <use x="317.816406" y="644" xlinkHref="#t" />
                                                    <use x="334.484375" y="644" xlinkHref="#s" />
                                                    <use x="354.523438" y="644" xlinkHref="#e" />
                                                    <use x="374.460938" y="644" xlinkHref="#a" />
                                                    <use x="393.449219" y="644" xlinkHref="#b" />
                                                    <use x="407.257812" y="644" xlinkHref="#a" />
                                                    <use x="70" y="672" xlinkHref="#r" />
                                                    <use x="82.183594" y="672" xlinkHref="#b" />
                                                    <use x="95.992188" y="672" xlinkHref="#c" />
                                                    <use x="115.226562" y="672" xlinkHref="#q" />
                                                    <use x="154.152344" y="672" xlinkHref="#d" />
                                                    <use x="167.535156" y="672" xlinkHref="#e" />
                                                    <use x="187.46875" y="672" xlinkHref="#a" />
                                                    <use x="216.207031" y="672" xlinkHref="#p" />
                                                    <use x="239.640625" y="672" xlinkHref="#c" />
                                                    <use x="258.878906" y="672" xlinkHref="#o" />
                                                    <use x="278.8125" y="672" xlinkHref="#f" />
                                                    <use x="308.492188" y="672" xlinkHref="#n" />
                                                    <use x="329.015625" y="672" xlinkHref="#b" />
                                                    <use x="342.820312" y="672" xlinkHref="#c" />
                                                    <use x="362.058594" y="672" xlinkHref="#m" />
                                                    <use x="371.65625" y="672" xlinkHref="#a" />
                                                    <use x="390.648438" y="672" xlinkHref="#g" />
                                                    <use x="407.242188" y="672" xlinkHref="#d" />
                                                </g>
                                            </svg>
                                        </div>
                                        <div className='flex gap-1'>
                                            <h2 className='textPerfil textEmail'>Email: {user.email}</h2>
                                            <svg onClick={updateEmail} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="40px" version="1.1" viewBox="0 0 700 700">
                                                <g>
                                                    <path d="m515.03 39.234c-2.5078 0.27344-4.8516 1.3828-6.6523 3.1523l-253.4 253.4c-1.8711 1.8203-3.0469 4.2344-3.3242 6.8242l-7.875 71.227c-0.39844 3.4023 0.78125 6.7969 3.2031 9.2188 2.4219 2.4219 5.8203 3.6055 9.2188 3.207l71.227-8.0508c2.5078-0.26953 4.8516-1.3828 6.6484-3.1484l253.4-253.4c2.125-2.1016 3.3242-4.9688 3.3242-7.9609 0-2.9922-1.1992-5.8594-3.3242-7.9648l-63.348-63.352-0.003906 0.003907c-2.4023-2.3672-5.7461-3.5234-9.0977-3.1523zm1.2266 26.949 47.602 47.602-15.75 15.75-47.602-47.602zm-395.85 29.051c-6.5703 0.20312-11.062 6.1562-11.199 11.199v403.2c0 5.8633 5.3359 11.199 11.199 11.199h403.2c5.8633 0 11.199-5.3359 11.199-11.199v-240.8c0.085938-5.918-5.2812-11.375-11.199-11.375-5.918 0-11.285 5.457-11.199 11.375v229.6h-380.8v-380.8h229.6c5.918 0.082032 11.375-5.2812 11.375-11.199 0-5.918-5.457-11.285-11.375-11.199zm364.18 2.625 47.602 47.602-201.95 201.95-47.602-47.602zm-212.45 223.12 36.75 36.75-41.301 4.5508z" />
                                                    <use x="70" y="644" xlinkHref="#u" />
                                                    <use x="90.546875" y="644" xlinkHref="#b" />
                                                    <use x="104.355469" y="644" xlinkHref="#a" />
                                                    <use x="123.347656" y="644" xlinkHref="#l" />
                                                    <use x="142.242188" y="644" xlinkHref="#d" />
                                                    <use x="155.625" y="644" xlinkHref="#a" />
                                                    <use x="174.617188" y="644" xlinkHref="#k" />
                                                    <use x="204.40625" y="644" xlinkHref="#j" />
                                                    <use x="224.449219" y="644" xlinkHref="#i" />
                                                    <use x="252.449219" y="644" xlinkHref="#h" />
                                                    <use x="262.046875" y="644" xlinkHref="#g" />
                                                    <use x="278.648438" y="644" xlinkHref="#c" />
                                                    <use x="297.882812" y="644" xlinkHref="#f" />
                                                    <use x="317.816406" y="644" xlinkHref="#t" />
                                                    <use x="334.484375" y="644" xlinkHref="#s" />
                                                    <use x="354.523438" y="644" xlinkHref="#e" />
                                                    <use x="374.460938" y="644" xlinkHref="#a" />
                                                    <use x="393.449219" y="644" xlinkHref="#b" />
                                                    <use x="407.257812" y="644" xlinkHref="#a" />
                                                    <use x="70" y="672" xlinkHref="#r" />
                                                    <use x="82.183594" y="672" xlinkHref="#b" />
                                                    <use x="95.992188" y="672" xlinkHref="#c" />
                                                    <use x="115.226562" y="672" xlinkHref="#q" />
                                                    <use x="154.152344" y="672" xlinkHref="#d" />
                                                    <use x="167.535156" y="672" xlinkHref="#e" />
                                                    <use x="187.46875" y="672" xlinkHref="#a" />
                                                    <use x="216.207031" y="672" xlinkHref="#p" />
                                                    <use x="239.640625" y="672" xlinkHref="#c" />
                                                    <use x="258.878906" y="672" xlinkHref="#o" />
                                                    <use x="278.8125" y="672" xlinkHref="#f" />
                                                    <use x="308.492188" y="672" xlinkHref="#n" />
                                                    <use x="329.015625" y="672" xlinkHref="#b" />
                                                    <use x="342.820312" y="672" xlinkHref="#c" />
                                                    <use x="362.058594" y="672" xlinkHref="#m" />
                                                    <use x="371.65625" y="672" xlinkHref="#a" />
                                                    <use x="390.648438" y="672" xlinkHref="#g" />
                                                    <use x="407.242188" y="672" xlinkHref="#d" />
                                                </g>
                                            </svg>
                                        </div>
                                        <div className='flex gap-1'>
                                            <h2 className='textPerfil'>Age: {user.age}</h2>
                                            <svg onClick={updateAge} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="40px" version="1.1" viewBox="0 0 700 700">
                                                <g>
                                                    <path d="m515.03 39.234c-2.5078 0.27344-4.8516 1.3828-6.6523 3.1523l-253.4 253.4c-1.8711 1.8203-3.0469 4.2344-3.3242 6.8242l-7.875 71.227c-0.39844 3.4023 0.78125 6.7969 3.2031 9.2188 2.4219 2.4219 5.8203 3.6055 9.2188 3.207l71.227-8.0508c2.5078-0.26953 4.8516-1.3828 6.6484-3.1484l253.4-253.4c2.125-2.1016 3.3242-4.9688 3.3242-7.9609 0-2.9922-1.1992-5.8594-3.3242-7.9648l-63.348-63.352-0.003906 0.003907c-2.4023-2.3672-5.7461-3.5234-9.0977-3.1523zm1.2266 26.949 47.602 47.602-15.75 15.75-47.602-47.602zm-395.85 29.051c-6.5703 0.20312-11.062 6.1562-11.199 11.199v403.2c0 5.8633 5.3359 11.199 11.199 11.199h403.2c5.8633 0 11.199-5.3359 11.199-11.199v-240.8c0.085938-5.918-5.2812-11.375-11.199-11.375-5.918 0-11.285 5.457-11.199 11.375v229.6h-380.8v-380.8h229.6c5.918 0.082032 11.375-5.2812 11.375-11.199 0-5.918-5.457-11.285-11.375-11.199zm364.18 2.625 47.602 47.602-201.95 201.95-47.602-47.602zm-212.45 223.12 36.75 36.75-41.301 4.5508z" />
                                                    <use x="70" y="644" xlinkHref="#u" />
                                                    <use x="90.546875" y="644" xlinkHref="#b" />
                                                    <use x="104.355469" y="644" xlinkHref="#a" />
                                                    <use x="123.347656" y="644" xlinkHref="#l" />
                                                    <use x="142.242188" y="644" xlinkHref="#d" />
                                                    <use x="155.625" y="644" xlinkHref="#a" />
                                                    <use x="174.617188" y="644" xlinkHref="#k" />
                                                    <use x="204.40625" y="644" xlinkHref="#j" />
                                                    <use x="224.449219" y="644" xlinkHref="#i" />
                                                    <use x="252.449219" y="644" xlinkHref="#h" />
                                                    <use x="262.046875" y="644" xlinkHref="#g" />
                                                    <use x="278.648438" y="644" xlinkHref="#c" />
                                                    <use x="297.882812" y="644" xlinkHref="#f" />
                                                    <use x="317.816406" y="644" xlinkHref="#t" />
                                                    <use x="334.484375" y="644" xlinkHref="#s" />
                                                    <use x="354.523438" y="644" xlinkHref="#e" />
                                                    <use x="374.460938" y="644" xlinkHref="#a" />
                                                    <use x="393.449219" y="644" xlinkHref="#b" />
                                                    <use x="407.257812" y="644" xlinkHref="#a" />
                                                    <use x="70" y="672" xlinkHref="#r" />
                                                    <use x="82.183594" y="672" xlinkHref="#b" />
                                                    <use x="95.992188" y="672" xlinkHref="#c" />
                                                    <use x="115.226562" y="672" xlinkHref="#q" />
                                                    <use x="154.152344" y="672" xlinkHref="#d" />
                                                    <use x="167.535156" y="672" xlinkHref="#e" />
                                                    <use x="187.46875" y="672" xlinkHref="#a" />
                                                    <use x="216.207031" y="672" xlinkHref="#p" />
                                                    <use x="239.640625" y="672" xlinkHref="#c" />
                                                    <use x="258.878906" y="672" xlinkHref="#o" />
                                                    <use x="278.8125" y="672" xlinkHref="#f" />
                                                    <use x="308.492188" y="672" xlinkHref="#n" />
                                                    <use x="329.015625" y="672" xlinkHref="#b" />
                                                    <use x="342.820312" y="672" xlinkHref="#c" />
                                                    <use x="362.058594" y="672" xlinkHref="#m" />
                                                    <use x="371.65625" y="672" xlinkHref="#a" />
                                                    <use x="390.648438" y="672" xlinkHref="#g" />
                                                    <use x="407.242188" y="672" xlinkHref="#d" />
                                                </g>
                                            </svg>
                                        </div>



                                    </div>
                                    <div className='flex justify-center'>
                                        <button onClick={updatePassword} className="shadow__btn btn-prof">Change Password</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
}