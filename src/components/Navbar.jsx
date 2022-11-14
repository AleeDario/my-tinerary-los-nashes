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
                    <img className="img-fluid" width="300px" src="./img/logo-header.png" alt="" />
                </Navlink>
            </div>
            <div className="flex gap-2 align-center btn-container">
                <div className='flex column'>
                    <ButtonNav buton='Home' fx={mostrarBoton} />
                    {mostrarOcultar && (
                        <div>
                            <CallToAction rute='/cities' classN='btn2' text='CITIES' />
                            <CallToAction rute='/hotels' classN='btn2' text='HOTELS' />
                        </div>
                    )}
                </div>
                <div>
                    <ButtonNav buton='User' fx={mostrarBoton2} />
                    {mostrarOcultar2 && (
                        <div>
                            <CallToAction rute='/signin' classN='btn2' text='SIGN IN' />
                            <CallToAction rute='/signup' classN='btn2' text='SIGN UP' />
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}