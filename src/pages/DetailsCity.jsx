import React from 'react'
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function DetailsCity() {

    const { id } = useParams()

    console.log(id)

    const [detailCards, setDetailCards] = useState([])
    const [itinerary, setItinerary] = useState([])

    let [mostrarEventoUno, setMostrarEventoUno] = useState(false)
    let [mostrarEventoDos, setMostrarEventoDos] = useState(false)

    useEffect(() => {
        axios.get(`http://localhost:8000/api/cities/${id}`)
            .then(res => setDetailCards(res.data.data))

            console.log(detailCards)

        axios.get(`http://localhost:8000/api/itineraries?cityId=${id}`)
            .then(res => setItinerary(res.data.data))
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

    if (detailCards) {
        return (
            <div className='flex column justify-center align-center contenedorGral'>
                <div className="card-detail-cities flex justify-center m-1 m-t-11 container-fluid">
                    <div className="img-card-detail bg-palette2 p-1 flex justify-center">
                        <img className="img-w-30 border-radius-1 img-h-20 img-fluid" src={detailCards.photo} alt={detailCards.name} />
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
                        <div className='flex justify-center gap-2'>
                            <button onClick={mostrarEvento1} className="botonEvent bg-palette2 w-40 flex justify-center p-1 p-x-3">
                                <p>Evento 1</p>
                            </button>
                            <button onClick={mostrarEvento2} className="botonEvent bg-palette2 w-40 flex justify-center p-1 p-x-3">
                                <p>Evento 2</p>
                            </button>
                        </div>
                    </div>
                </div>
                {mostrarEventoUno && (
                    <div className='flex justify-center'>
                        <div className='flex column justify-center gap-1 align-center bg-palette1 w-50 text-white p-3 border-radius-2'>
                            <img className='img-fluid' width='400px' src={itinerary[0].photo[numeroRandom(itinerary[0].photo.length - 1)]} alt="" />
                            <h1>{itinerary[0].name}</h1>
                            <p>{itinerary[0].description}</p>
                            <p>Price : ${itinerary[0].price}</p>
                        </div>
                    </div>
                )}
                {mostrarEventoDos && (
                    <div className='flex justify-center cont-event'>
                        <div className='flex column justify-center gap-1 align-center bg-palette1 w-50 text-white p-3 border-radius-2'>
                            <img className='img-fluid' width='400px' src={itinerary[1].photo[numeroRandom(itinerary[1].photo.length - 1)]} alt="" />
                            <h1>{itinerary[1].name}</h1>
                            <p>{itinerary[1].description}</p>
                            <p>Price : ${itinerary[1].price}</p>
                        </div>
                    </div>
                )}
            </div>
        )
    }

}
