import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import reactionActions from '../redux/actions/reactionActions'
import Swal from 'sweetalert2'
import BotonEnviarForm from '../components/BotonEnviarForm'
import InputForm from '../components/InputForm'
import { useRef, useEffect, useState } from 'react'
import cityActions from '../redux/actions/cityActions'
import hotelActions from '../redux/actions/hotelActions'


export default function NewReaction() {

    const dispatch = useDispatch()
    const { itinerariesAll } = useSelector(state => state.city)
    const { allShows } = useSelector(state => state.hotel)
    const eventsAll = itinerariesAll.concat(allShows)
    const { token } = useSelector(state => state.user)
    const { getItinerariesAll } = cityActions
    const { getAllShows } = hotelActions
    const { createReaction } = reactionActions

    const form = useRef()
    const name = useRef()
    const icon = useRef()
    const iconBack = useRef()
    const eventId = useRef()

    useEffect(() => {
        dispatch(getItinerariesAll())
        dispatch(getAllShows())
        // eslint-disable-next-line
    }, [])

    function enviarForm(e) {
        e.preventDefault()
        let itinerary = itinerariesAll.find(itinerary => itinerary._id === eventId.current.value)
        let show = allShows.find(show => show._id === eventId.current.value)

        let datos = {
            token,
            reaction: {
                name: name.current.value,
                icon: icon.current.value,
                iconBack: iconBack.current.value,
                userId: []
            }
        }

        if (itinerary) {
            datos.reaction.itineraryId = eventId.current.value
        } else if (show) {
            datos.reaction.showId = eventId.current.value
        }
        // Alerta preguntando si desea crear la reacción
        Swal.fire({
            icon: 'info',
            title: 'Are you sure you want to create this reaction?',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Create it',
            cancelButtonText: 'Cancel'
        })
            .then(async result => {
                try {
                    if (result.isConfirmed) {
                        let res = await dispatch(createReaction(datos))
                        if (res.payload.success) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Reaction successfully created',
                                showConfirmButton: true,
                            })
                            form.current.reset()
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                html: res.payload.payload.message.join(' <br> '),
                            })
                        }
                    }
                } catch (error) {
                    console.log(error)
                }
            })
    }


    return (
        <main className="w-100 flex column align-center p-3 gap-2 main-container-sign">
            <img className='imgFondo' src='../img/fondo.jpg' alt='fondo-img' />
            <div className="flex justify-center">
                <form ref={form}>
                    <div className="cardForm flex column align-center justify-center container-fluid p-2">
                        <h1 className="text-palette2 titleForm">New Reaction</h1>
                        <div className='flex cardForm-children container-fluid'>
                            <img width='450px' className="flex align-center img-fluid" src="../img/newReactions.png" alt="drawing" />
                            <div className='flex column gap-1 justify-center align-center container-fluid'>
                                <div className="input-wrapper flex column gap-1">
                                    <InputForm classN="signup-input" type="text" place="Reaction Name" id="name" refId={name} />
                                    <InputForm classN="signup-input" type="text" place='Url Icon' id="icon" refId={icon} />
                                    <InputForm classN="signup-input" type="text" place='Url Icon Back' id="iconBack" refId={iconBack} />
                                    <label className='title-select' htmlFor='cityId'>Select a itinerary o show :</label>
                                    < select ref={eventId} className="signup-input select" id="eventId">
                                        {eventsAll.map(event => <option key={event._id} value={event._id}>{event.name}</option>)}
                                    </select>
                                </div>
                                <BotonEnviarForm fx={enviarForm} texto='Create Reaction' />
                            </div>
                        </div>
                    </div>
                </form>
            </div >
        </main >
    )
}
