import React from 'react'
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import apiUrl from '../api/url';

export default function DetailsHotels() {
    const { id } = useParams()

    const [detailCards, setDetailCards] = useState([])
    const [events, setEvents] = useState([])

    let [mostrarEventoUno, setMostrarEventoUno] = useState(false)
    let [mostrarEventoDos, setMostrarEventoDos] = useState(false)

    useEffect(() => {
        axios.get(`${apiUrl}/api/hotels/${id}`)
            .then(res => setDetailCards(res.data.data))

        axios.get(`${apiUrl}/api/shows?hotelId=${id}`)
            .then(res => setEvents(res.data.data))
        // eslint-disable-next-line
    }, [])

    console.log(events)


    function numeroRandom(numero) {
        return Math.floor(Math.random() * numero)
    }

    let mostrarEvento1 = () => {
        setMostrarEventoUno(!mostrarEventoUno)
        setMostrarEventoDos(false)
    }

    let mostrarEvento2 = () => {
        setMostrarEventoUno(false)
        setMostrarEventoDos(!mostrarEventoDos)
    }

    if (detailCards.length !== 0) {
        return (
            <div className='flex column justify-center align-center contenedorGral'>
                <img className='imgFondo' src='../img/fondo.jpg' alt='fondo-img'/>
                <div className="card-detail-cities flex justify-center m-1 m-t-11 container-fluid">
                    <div className="img-card-detail bg-palette2 p-1 flex justify-center">
                        <img className="img-w-30 border-radius-1 img-h-20 img-fluid" src={detailCards.photo[numeroRandom(detailCards.photo.length - 1)]} alt={detailCards.name} />
                    </div>
                    <div className="text-card-detail flex column justify-center align-center bg-palette1 text-white gap-2 p-1">
                        <div className="logo-details">
                            <img className="img-w-5" src="./img/building1.png" alt="" />
                        </div>
                        <div className="flex column justify-center align-center gap-1">
                            <h1>{detailCards.name}</h1>
                            <p>{detailCards.capacity}</p>
                        </div>
                        <button className="bg-palette2 w-40 flex justify-center p-1 p-x-3">
                            <p>Comments</p>
                        </button>
                        {events.length !== 0 && (
                            <div className='flex justify-center gap-2 w-100'>
                            <button onClick={mostrarEvento1} className="botonEvent bg-palette2 w-40 flex justify-center p-1 p-x-3">
                                <p>Show One</p>
                            </button>
                            <button onClick={mostrarEvento2} className="botonEvent bg-palette2 w-40 flex justify-center p-1 p-x-3">
                                <p>Show Two</p>
                            </button>
                        </div>
                        )}
                    </div>
                </div>
                {mostrarEventoUno && (
                    <div className='flex justify-center cont-event m-t-5 '>
                    <div className='flex column justify-center gap-1 align-center bg-palette1 w-50 text-white p-3 border-radius-2 cont-event-children'>
                            <img className='img-fluid' width='400px' src={events[0].photo} alt="" />
                            <h1>{events[0].name}</h1>
                            <p>{events[0].description}</p>
                            <p>{events[0].date.split('T00:00:00.000Z')}</p>
                            <p>Price : ${events[0].price}</p>
                        </div>
                    </div>
                )}
                {mostrarEventoDos && (
                    <div className='flex justify-center cont-event m-t-5 '>
                    <div className='flex column justify-center gap-1 align-center bg-palette1 w-50 text-white p-3 border-radius-2 cont-event-children'>
                            <img className='img-fluid' width='400px' src={events[1].photo} alt="" />
                            <h1>{events[1].name}</h1>
                            <p>{events[1].description}</p>
                            <p>{events[1].date.split('T00:00:00.000Z')}</p>
                            <p>Price : ${events[1].price}</p>
                        </div>
                    </div>
                )}
            </div>
        )
    }

}