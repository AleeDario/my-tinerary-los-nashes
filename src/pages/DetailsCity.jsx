import React from 'react'
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import apiUrl from '../api/url';

export default function DetailsCity() {

    const { id } = useParams()

    const [detailCards, setDetailCards] = useState([])
    const [itinerary, setItinerary] = useState([])

    let [mostrarEventoUno, setMostrarEventoUno] = useState(false)
    let [mostrarEventoDos, setMostrarEventoDos] = useState(false)

    useEffect(() => {
        axios.get(`${apiUrl}/api/cities/${id}`)
            .then(res => setDetailCards(res.data.data))

        axios.get(`${apiUrl}/api/itineraries?cityId=${id}`)
            .then(res => setItinerary(res.data.data))
        // eslint-disable-next-line
    }, [])

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
        let name = detailCards.name.split(" ").join("")
        name = name.toLowerCase()
        let ciudades = [
            'New York',
            'Paris',
            'Rio de Janeiro',
            'Dubai',
            'Buenos Aires',
            'Pekin',
            'London',
            'Tokyo',
            'Rome',
            'Barcelona',
            'Cape Town',
            'Sídney',
            'Cartagena',
        ]
        let videoFondo= `../img/video/${name}.mp4`
        return (
            <>
                <div className='flex column justify-center align-center contenedorGral'>
                    <img className='imgFondo' src='../img/fondo.jpg' alt='fondo-img'/>
                    <div className="card-detail-cities flex justify-center m-1 m-t-11 container-fluid">
                        <div className="img-card-detail bg-palette2 p-1 flex justify-center align-center">
                            {ciudades.includes(detailCards.name) ? (
                                <video className='img-w-30 border-radius-1 img-fluid' src={videoFondo} autoPlay muted loop></video>
                            ) : (
                                <img className='img-w-30 img-detail border-radius-1 img-fluid' src={detailCards.photo} alt={detailCards.name} />
                            )}
                            
                        </div>
                        <div className="text-card-detail flex column justify-center align-center bg-palette1 text-white gap-2 p-1">
                            <div className="logo-details">
                                <img className="img-w-5" src="./img/building1.png" alt="" />
                            </div>
                            <div className="flex column justify-center align-center gap-1">
                                <h1>{detailCards.name}</h1>
                                <p>{detailCards.continent}</p>
                                <p>{detailCards.population}</p>
                            </div>
                            <button className="bg-palette2 w-40 flex justify-center p-1 p-x-3">
                                <p>Comments</p>
                            </button>
                            {itinerary.length !== 0 && (
                                <div className='flex justify-center gap-2 w-100'>
                                    <button onClick={mostrarEvento1} className="botonEvent bg-palette2 w-40 flex justify-center p-1 p-x-3">
                                        <p>Event One</p>
                                    </button>
                                    <button onClick={mostrarEvento2} className="botonEvent bg-palette2 w-40 flex justify-center p-1 p-x-3">
                                        <p>Event Two</p>
                                    </button>
                                </div>)}
                        </div>
                    </div>
                    {mostrarEventoUno && (
                        <div className='flex justify-center cont-event m-t-5 '>
                            <div className='flex column justify-center gap-1 align-center bg-palette1 w-50 text-white p-3 border-radius-2 cont-event-children'>
                                <img className='img-fluid' width='400px' src={itinerary[0].photo[numeroRandom(itinerary[0].photo.length - 1)]} alt="" />
                                <h1>{itinerary[0].name}</h1>
                                <p>{itinerary[0].description}</p>
                                <p>Price : ${itinerary[0].price}</p>
                            </div>
                        </div>
                    )}
                    {mostrarEventoDos && (
                        <div className='flex justify-center cont-event m-t-5'>
                            <div className='flex column justify-center gap-1 align-center bg-palette1 w-50 text-white p-3 border-radius-2 cont-event-children'>
                                <img className='img-fluid' width='400px' src={itinerary[1].photo[numeroRandom(itinerary[1].photo.length - 1)]} alt="" />
                                <h1>{itinerary[1].name}</h1>
                                <p>{itinerary[1].description}</p>
                                <p>Price : ${itinerary[1].price}</p>
                            </div>
                        </div>
                    )}
                </div>
            </>
        )
    }

}
