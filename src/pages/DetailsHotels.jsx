import React from 'react'
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';

export default function DetailsHotels() {
    const { id } = useParams()

    const [detailCards, setDetailCards2] = useState([])
    const [events, setEvents] = useState([])

    let [mostrarEventoUno, setMostrarEventoUno] = useState(false)
    let [mostrarEventoDos, setMostrarEventoDos] = useState(false)

    useEffect(() => {
        fetch('../places.json')
            .then(response => response.json())
            .then(response => setDetailCards2(response))

        fetch('../events.json')
            .then(response => response.json())
            .then(response => setEvents(response))
    }, [])

    function numeroRandom(numero) {
        return Math.floor(Math.random() * numero)
    }

    let hotelsFilt = detailCards.filter((hotel) => hotel.id === id)[0]

    let eventsFilt = events.filter((event) => event.hotelId === id)

    let mostrarEvento1 = () => {
        setMostrarEventoUno(!mostrarEventoUno)
        setMostrarEventoDos(false)
    }

    let mostrarEvento2 = () => {
        setMostrarEventoUno(false)
        setMostrarEventoDos(!mostrarEventoDos)
    }

    if (hotelsFilt) {
        return (
            <div className='flex column justify-center align-center contenedorGral'>
                <div className="card-detail-cities flex justify-center m-1 m-t-11 container-fluid">
                    <div className="img-card-detail bg-palette2 p-1 flex justify-center">
                        <img className="img-w-30 border-radius-1 img-h-20 img-fluid" src={hotelsFilt.photo[numeroRandom(hotelsFilt.photo.length - 1)]} alt={hotelsFilt.name} />
                    </div>
                    <div className="text-card-detail flex column justify-center align-center bg-palette1 text-white gap-2 p-1">
                        <div className="logo-details">
                            <img className="img-w-5" src="./img/building1.png" alt="" />
                        </div>
                        <div className="flex column justify-center align-center gap-1">
                            <h1>{hotelsFilt.name}</h1>
                            <p>{hotelsFilt.capacity}</p>
                        </div>
                        <button className="bg-palette2 w-40 flex justify-center p-1 p-x-3">
                            <p>Comments</p>
                        </button>
                        <div className='flex justify-center gap-2'>
                            <button onClick={mostrarEvento1} className="botonEvent bg-palette2 w-40 flex justify-center p-1 p-x-3">
                                <p>Show 1</p>
                            </button>
                            <button onClick={mostrarEvento2} className="botonEvent bg-palette2 w-40 flex justify-center p-1 p-x-3">
                                <p>Show 2</p>
                            </button>
                        </div>
                    </div>
                </div>
                {mostrarEventoUno && (
                    <div className='flex justify-center'>
                        <div className='flex column justify-center gap-1 align-center bg-palette1 w-50 text-white p-3 border-radius-2'>
                            <img className='img-fluid' width='400px' src={eventsFilt[0].photo} alt="" />
                            <h1>{eventsFilt[0].name}</h1>
                            <p>{eventsFilt[0].description}</p>
                            <p>{eventsFilt[0].date}</p>
                            <p>Price : ${eventsFilt[0].price}</p>
                        </div>
                    </div>
                )}
                {mostrarEventoDos && (
                    <div className='flex justify-center cont-event'>
                        <div className='flex column justify-center gap-1 align-center bg-palette1 w-50 text-white p-3 border-radius-2'>
                            <img className='img-fluid' width='400px' src={eventsFilt[1].photo} alt="" />
                            <h1>{eventsFilt[1].name}</h1>
                            <p>{eventsFilt[1].description}</p>
                            <p>{eventsFilt[1].date}</p>
                            <p>Price : ${eventsFilt[1].price}</p>
                        </div>
                    </div>
                )}
            </div>
        )
    }

}