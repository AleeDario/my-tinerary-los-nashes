import React from 'react'
import { useRef } from 'react'
import BotonEnviarForm from '../components/BotonEnviarForm'
import InputForm from '../components/InputForm'
import { useDispatch, useSelector} from 'react-redux'
import cityActions from '../redux/actions/cityActions'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'


export default function NewCity() {

    const dispatch = useDispatch()
    const { createCity} = cityActions
    const { id, token } = useSelector(state => state.user)
    const navigate = useNavigate()

    const form = useRef()
    const name = useRef()
    const continent = useRef()
    const photo = useRef()
    const population = useRef()

    async function enviarFormulario(event) {
        event.preventDefault()

        let datos = {
            token,
            city:{
                name: name.current.value,
                continent: continent.current.value,
                photo: photo.current.value,
                population: population.current.value,
                userId: id,
            }
        }

        try {
            let res = await dispatch(createCity(datos))
            if (res.payload.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'City created successfully.',
                    showConfirmButton: true,
                })
                .then(result => {
                    if(result.isConfirmed){
                        navigate(`/details/${res.payload.id}`)
                    }
                })  
                form.current.reset()    
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    html: res.payload.messages.join(' <br> '),
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <main className="w-100 flex column align-center p-3 gap-2 main-container-sign">
            <img className='imgFondo' src='../img/fondo.jpg' alt='fondo-img' />
            <div className="flex justify-center">
                <form ref={form}>
                    <div className="cardForm flex column align-center justify-center container-fluid p-2">
                        <h1 className="text-palette2 titleForm">New City</h1>
                        <div className='flex cardForm-children container-fluid'>
                            <img width='400px' className="flex align-center img-fluid" src="../img/newCity.png" alt="drawing" />
                            <div className='flex column gap-1 justify-center align-center container-fluid'>
                                <div className="input-wrapper flex column gap-1">
                                    <InputForm classN="signup-input" type="text" place="Name" id="name" refId={name} />
                                    <InputForm classN="signup-input" type="text" place="Continent" id="continent" refId={continent} />
                                    <InputForm classN="signup-input" type="text" place='Url Photo' id="photo" refId={photo} />
                                    <InputForm classN="signup-input" type="number" place="Population" id="population" refId={population} />
                                </div>
                                <BotonEnviarForm fx={enviarFormulario} texto='Create City' />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
}
