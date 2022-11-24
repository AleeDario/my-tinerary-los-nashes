import React from 'react'
import { useState } from 'react'
import ButtonNav from './ButtonNav'
import CallToAction from './CallToAction'
import { Link as Navlink} from 'react-router-dom'

export default function Navbar() {

    let [mostrarOcultar, setMostrarOcultar] = useState(false)
    let [mostrarOcultar2, setMostrarOcultar2] = useState(false)

    let mostrarBoton = () => {
        setMostrarOcultar(!mostrarOcultar)
        setMostrarOcultar2(false)
    }

    let mostrarBoton2 = () => {
        setMostrarOcultar2(!mostrarOcultar2)
        setMostrarOcultar(false)
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
                    <ButtonNav buton='User' fx={mostrarBoton2} />
                    {mostrarOcultar2 && (
                        <div>
                            <CallToAction rute='/signin' classN='btn3' text='SIGN IN' />
                            <CallToAction rute='/signup' classN='btn3' text='SIGN UP' />
                            <CallToAction rute='/newcity' classN='btn3' text='NEW CITY' />
                            <CallToAction rute='/newhotel' classN='btn3' text='NEW HOTEL' />
                            <CallToAction rute='/mycities' classN='btn3' text='MY CITIES' />
                            <CallToAction rute='/myhotels' classN='btn3' text='MY HOTELS' />
                            <CallToAction rute='/myitineraries' classN='btn3' text='MY ITINERARY' />
                            <CallToAction rute='/myshows' classN='btn3' text='MY SHOWS' />
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}