import React from 'react'
import { useRef } from 'react'
import BotonEnviarForm from '../components/BotonEnviarForm'
import InputForm from '../components/InputForm'
import axios from 'axios'

export default function NewHotel() {
    const form = useRef()
    const name = useRef()
    const photo1 = useRef()
    const photo2 = useRef()
    const photo3 = useRef()
    const capacity = useRef()
    const cityId = useRef()
    let newHotel = []

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
            axios.post(`http://localhost:8000/api/hotels`, newHotel)
            form.current.reset()
            alert('Hotel creado con éxito')
            console.log(newHotel)
        } else {
            alert('Todos los campos son obligatorios')
        }
    }

    return (
        <main className="w-100 flex column align-center p-3 gap-2 main-container-sign">
            <h1 className="text-palette2 ">New Hotel</h1>
            <div className="flex justify-center">
                <form ref={form}>
                    <div className="card flex column align-center justify-center container-fluid">
                        <img className="img-w-20 flex align-center img-fluid" src="../img/signup-img.png" alt="drawing" />
                        <div className="input-wrapper flex column gap-1">
                            <InputForm classN="signup-input" type="text" place="Name" id="name" refId={name} />
                            <InputForm classN="signup-input" type="text" place='Photo 1' id="Photo1" refId={photo1} />
                            <InputForm classN="signup-input" type="text" place='Photo 2' id="Photo2" refId={photo2} />
                            <InputForm classN="signup-input" type="text" place='Photo 3' id="Photo3" refId={photo3} />
                            <InputForm classN="signup-input" type="text" place="Capacity" id="capacity" refId={capacity} />
                            <InputForm classN="signup-input" type="text" place="CityId" id="cityId" refId={cityId} />
                        </div>
                        <BotonEnviarForm fx={enviarFormulario} texto='Create Hotel' />
                    </div>
                </form>
            </div>
        </main>
    )
}
