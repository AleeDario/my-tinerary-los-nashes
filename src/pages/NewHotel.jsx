import React from 'react'
import { useRef } from 'react'
import BotonEnviarForm from '../components/BotonEnviarForm'
import InputForm from '../components/InputForm'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import apiUrl from '../api/url'

export default function NewHotel() {

    const form = useRef()
    const name = useRef()
    const photo1 = useRef()
    const photo2 = useRef()
    const photo3 = useRef()
    const capacity = useRef()
    const cityId = useRef()
    let newHotel = []
    let [citiesSelect, setCitiesSelect] = useState([])

    useEffect(() => {
        axios.get(`${apiUrl}/api/cities`)
            .then(res => setCitiesSelect(res.data.data))
            .catch(err => console.log(err))
    }, [])


    const enviarFormulario = () => {

        if (name.current.value !== '' && photo1.current.value !== '' && photo2.current.value !== '' && photo3.current.value !== '' && capacity.current.value !== '' && cityId.current.value !== '') {
            newHotel.push(
                {
                    name: name.current.value,
                    photo: [photo1.current.value, photo2.current.value, photo3.current.value],
                    capacity: Number(capacity.current.value),
                    cityId: cityId.current.value,
                    userId: '636d82c86529ebe93bbef91f'
                }
            )
            axios.post(`${apiUrl}/api/hotels`, newHotel)
            form.current.reset()
            alert('Hotel creado con éxito')
            console.log(newHotel)
        } else {
            alert('Todos los campos son obligatorios')
        }
    }

    return (
        <main className="w-100 flex column align-center p-3 gap-2 main-container-sign">
            <img className='imgFondo' src='../img/fondo.jpg' alt='fondo-img'/>
            <div className="flex justify-center">
                <form ref={form}>
                    <div className="cardForm flex column align-center justify-center container-fluid p-2">
                        <h1 className="text-palette2 titleForm">New Hotel</h1>
                        <div className='flex cardForm-children container-fluid'>
                            <img width='400px' className="flex align-center img-fluid" src="../img/newHotel.png" alt="drawing" />
                            <div className='flex column gap-1 justify-center align-center container-fluid'>
                                <div className="input-wrapper flex column gap-1">
                                    <InputForm classN="signup-input" type="text" place="Name" id="name" refId={name} />
                                    <InputForm classN="signup-input" type="text" place='Url Photo 1' id="Photo1" refId={photo1} />
                                    <InputForm classN="signup-input" type="text" place='Url Photo 2' id="Photo2" refId={photo2} />
                                    <InputForm classN="signup-input" type="text" place='Url Photo 3' id="Photo3" refId={photo3} />
                                    <InputForm classN="signup-input" type="text" place="Capacity" id="capacity" refId={capacity} />
                                    <label className='title-select' for='cityId'>Select a city :</label>
                                    <select ref={cityId} className="signup-input select" id="cityId">
                                        {citiesSelect.map(city => <option key={city._id} value={city._id}>{city.name}</option>)}
                                    </select>
                                </div>
                                <BotonEnviarForm fx={enviarFormulario} texto='Create Hotel' />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
}
