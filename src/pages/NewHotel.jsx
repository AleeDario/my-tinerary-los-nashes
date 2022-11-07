import React from 'react'
import { useRef } from 'react'
import BotonEnviarForm from '../components/BotonEnviarForm'
import InputForm from '../components/InputForm'

export default function NewHotel() {
    const form = useRef()
    const id = useRef()
    const namee = useRef()
    const photo1 = useRef()
    const photo2 = useRef()
    const photo3 = useRef()
    const capacity = useRef()
    const cityId = useRef()

    let newHotel = []

    const enviarFormulario = () => {

        if (id.current.value !== '' && namee.current.value !== '' && photo1.current.value !== '' && photo2.current.value !== '' && photo3.current.value !== '' && capacity.current.value !== '' && cityId.current.value !== '') {
                        newHotel.push(
                            {
                                id: id.current.value,
                                namee: namee.current.value,
                                photo: [photo1.current.value, photo2.current.value, photo3.current.value],
                                capacity: capacity.current.value,
                                cityId: cityId.current.value
                            }
                        )
                        form.current.reset()
                        alert('Hotel creado con éxito')
                    
        } else {
            alert('Todos los campos son obligatorios')
        }

        localStorage.setItem('newHotel', JSON.stringify(newHotel))
    }

    return (
        <main className="w-100 flex column align-center p-3 gap-2 main-container-sign">
            <h1 className="text-palette2 ">New Hotel</h1>
            <div className="flex justify-center">
                <form ref={form}>
                    <div className="card flex column align-center justify-center container-fluid">
                        <img className="img-w-20 flex align-center img-fluid" src="../img/signup-img.png" alt="drawing" />
                        <div className="input-wrapper flex column gap-1">
                            <InputForm classN="signup-input" type="text" place="Id" id="Id" refId={id} />
                            <InputForm classN="signup-input" type="text" place="Name" id="name" refId={namee} />
                            <InputForm classN="signup-input" type="text" place='Photo 1' id="Photo1" refId={photo1} />
                            <InputForm classN="signup-input" type="text" place='Photo 2' id="Photo2" refId={photo2} />
                            <InputForm classN="signup-input" type="text" place='Photo 3' id="Photo3" refId={photo3} />
                            <InputForm classN="signup-input" type="text" place="Capacity" id="capacity" refId={capacity} />
                            <InputForm classN="signup-input" type="text" place="cityId" id="cityId" refId={cityId} />
                        </div>
                        <BotonEnviarForm fx={enviarFormulario} texto='Create Hotel' />
                    </div>
                </form>
            </div>
        </main>
    )
}
