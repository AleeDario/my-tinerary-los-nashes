import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import reactionActions from '../redux/actions/reactionActions'
import Swal from 'sweetalert2'
import BotonEnviarForm from '../components/BotonEnviarForm'
import InputForm from '../components/InputForm'
import { useRef } from 'react'
import { useEffect } from 'react'
import cityActions from '../redux/actions/cityActions'


export default function NewReaction() {

    const dispatch = useDispatch()
    const { itinerariesAll } = useSelector(state => state.city)
    const { token } = useSelector(state => state.user)
    const { getItinerariesAll } = cityActions
    const { createReaction } = reactionActions

    const form = useRef()
    const name = useRef()
    const icon = useRef()
    const iconBack = useRef()
    const itineraryId = useRef()

    useEffect(() => {
        dispatch(getItinerariesAll())
        // eslint-disable-next-line
    }, [])

    function enviarForm(e) {
        e.preventDefault()
        let datos = {
            token,
            reaction: {
                name: name.current.value,
                icon: icon.current.value,
                iconBack: iconBack.current.value,
                itineraryId: itineraryId.current.value,
                userId: []
            }
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
                            console.log(res.payload)
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
                                    <label className='title-select' htmlFor='cityId'>Select a itinerary :</label>
                                    <select ref={itineraryId} className="signup-input select" id="itineraryId">
                                        {itinerariesAll.map(itinerary => <option key={itinerary._id} value={itinerary._id}>{itinerary.name}</option>)}
                                    </select>
                                </div>
                                <BotonEnviarForm fx={enviarForm} texto='Create Reaction' />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
}
