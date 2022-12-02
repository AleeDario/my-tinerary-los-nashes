import React from 'react'
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import apiUrl from '../api/url';
import CardItinerary from '../components/CardItinerary';

export default function DetailsCity() {

    const { id } = useParams()

    const [detailCards, setDetailCards] = useState([])
    const [itinerary, setItinerary] = useState([])

    let [mostrarEventoUno, setMostrarEventoUno] = useState(false)

    useEffect(() => {
        axios.get(`${apiUrl}/api/cities/${id}`)
            .then(res => setDetailCards(res.data.data))

        axios.get(`${apiUrl}/api/itineraries?cityId=${id}`)
            .then(res => setItinerary(res.data.data))
        // eslint-disable-next-line
    }, [])

    let mostrarEvento1 = () => {
        setMostrarEventoUno(!mostrarEventoUno)
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
        let videoFondo = `../img/video/${name}.mp4`
        return (
            <>
                <div className='flex column justify-center align-center contenedorGral'>
                    <img className='imgFondo' src='../img/fondo.jpg' alt='fondo-img' />
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
                            {itinerary.length !== 0 && (
                                <div className='flex justify-center gap-2 w-100'>
                                    <button onClick={mostrarEvento1} className="botonEvent bg-palette2 w-40 flex justify-center p-1 p-x-3">
                                        <p>Itineraries</p>
                                    </button>
                                </div>)}
                        </div>
                    </div>
                    {mostrarEventoUno && (
                        itinerary?.length > 0 &&
                        itinerary?.map(i => {
                        return <CardItinerary key={i._id} itinerary={i} />
                    })
                    )}
                </div>
            </>
        )
    }

}
