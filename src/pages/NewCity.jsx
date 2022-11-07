import React from 'react'
import { useRef } from 'react'
import BotonEnviarForm from '../components/BotonEnviarForm'
import InputForm from '../components/InputForm'

export default function NewCity() {

    const form = useRef()
    const id = useRef()
    const namee = useRef()
    const continent = useRef()
    const photo = useRef()
    const population = useRef()

    let newCity = []

    const enviarFormulario = () => {

        if (id.current.value !== '' && namee.current.value !== '' && continent.current.value !== '' && photo.current.value !== '' && population.current.value !== '') {
                        newCity.push(
                            {
                                id: id.current.value,
                                namee: namee.current.value,
                                continent: continent.current.value,
                                photo: photo.current.value,
                                population: population.current.value
                            }
                        )
                        form.current.reset()
                        alert('Ciudad creada con éxito')
                    
        } else {
            alert('Todos los campos son obligatorios')
        }

        localStorage.setItem('newCity', JSON.stringify(newCity))
    }

    return (
        <main className="w-100 flex column align-center p-3 gap-2 main-container-sign">
            <h1 className="text-palette2 ">New City</h1>
            <div className="flex justify-center">
                <form ref={form}>
                    <div className="card flex column align-center justify-center container-fluid">
                        <img className="img-w-20 flex align-center img-fluid" src="../img/signup-img.png" alt="drawing" />
                        <div className="input-wrapper flex column gap-1">
                            <InputForm classN="signup-input" type="text" place="Id" id="Id" refId={id} />
                            <InputForm classN="signup-input" type="text" place="Name" id="name" refId={namee} />
                            <InputForm classN="signup-input" type="text" place="Continent" id="continent" refId={continent} />
                            <InputForm classN="signup-input" type="text" place='Photo' id="Photo" refId={photo} />
                            <InputForm classN="signup-input" type="text" place="Population" id="tel" refId={population} />
                        </div>

                        <BotonEnviarForm fx={enviarFormulario} texto='Create City' />
                    </div>
                </form>
            </div>
        </main>
    )
}
