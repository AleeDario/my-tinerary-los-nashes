import React from 'react'
import { useState } from 'react'
import ButtonNav from './ButtonNav'
import CallToAction from './CallToAction'
import { Link as Navlink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import userActions from '../redux/actions/userActions'
import Swal from 'sweetalert2'

export default function Navbar() {

    let [mostrarOcultar, setMostrarOcultar] = useState(false)
    let [mostrarOcultar2, setMostrarOcultar2] = useState(false)
    const dispatch = useDispatch()
    const { online, role, photo, name, token } = useSelector(state => state.user)
    const { logout } = userActions

    let mostrarBoton = () => {
        setMostrarOcultar(!mostrarOcultar)
        setMostrarOcultar2(false)
    }

    let mostrarBoton2 = () => {
        setMostrarOcultar2(!mostrarOcultar2)
        setMostrarOcultar(false)
    }

    function singOut() {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log out!'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    dispatch(logout(token))
                    Swal.fire(
                        'Logged out!',
                        'You have been logged out',
                        'success'
                    )
                }
            })
    }

    return (
        <nav className="flex justify-between p-1 nav-container">
            <div>
                <Navlink to='/'>
                    <img className="img-fluid" width="300px" src="../img/logo-header.png" alt="" />
                </Navlink>
            </div>
            <div className="flex gap-2 align-center btn-container">
                <div className='flex column'>
                    <ButtonNav buton='Home' fx={mostrarBoton} />
                    {mostrarOcultar && (
                        <div>
                            <CallToAction rute='/cities' classN='btn3' text='CITIES' />
                            <CallToAction rute='/hotels' classN='btn3' text='HOTELS' />

                        </div>
                    )}
                </div>
                <div>
                    {online ? (
                        <div className='flex column justify-center align-center gap-0-5'>
                            <img src={photo} width='50' alt="userLoged" onClick={mostrarBoton2} />
                            <h5 className='text-white'>{name}</h5>
                        </div>
                    ) : (
                        <ButtonNav buton='User' fx={mostrarBoton2} />
                    )

                    }
                    {mostrarOcultar2 && (
                        <div>
                            {!online && (
                                <>
                                    <CallToAction rute='/signin' classN='btn3' text='SIGN IN' />
                                    <CallToAction rute='/signup' classN='btn3' text='SIGN UP' />
                                </>
                            )}
                            {online && (
                                <CallToAction rute='/myprofile' classN='btn3' text='MY PROFILE' />
                            )}
                            {role === 'admin' && (
                                <>
                                    <CallToAction rute='/mycities' classN='btn3' text='MY CITIES' />
                                    <CallToAction rute='/myhotels' classN='btn3' text='MY HOTELS' />
                                </>
                            )}
                            {online && (
                                <>
                                    <CallToAction rute='/myitineraries' classN='btn3' text='MY ITINERARY' />
                                    <CallToAction rute='/myshows' classN='btn3' text='MY SHOWS' />
                                    <CallToAction fx={singOut} classN='btn3' text='LOG OUT' />
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}