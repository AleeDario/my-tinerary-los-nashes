import { useRef } from 'react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cityActions from '../redux/actions/cityActions'
import Swal from 'sweetalert2'
import BotonEnviarForm from '../components/BotonEnviarForm'
import InputForm from '../components/InputForm'
import { useNavigate } from 'react-router-dom'

export default function NewItinerary() {

    const dispatch = useDispatch()
    const { createItinerary } = cityActions
    const { cities } = useSelector(state => state.city)
    const { token, id } = useSelector(state => state.user)
    const navigate = useNavigate()

    const form = useRef()
    const name = useRef()
    const photo1 = useRef()
    const photo2 = useRef()
    const photo3 = useRef()
    const description = useRef()
    const duration = useRef()
    const price = useRef()
    const cityId = useRef()

    async function enviarForm(e) {
        e.preventDefault()
        let datos = {
            token,
            itinerary: {
                name: name.current.value,
                photo: [photo1.current.value, photo2.current.value, photo3.current.value],
                description: description.current.value,
                duration: duration.current.value,
                price: price.current.value,
                cityId: cityId.current.value,
                userId: id
            }
        }
        try {
            let res = await dispatch(createItinerary(datos))
            console.log(res)
            if (res.payload.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Itinerary successfully created',
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'See my itineraries',
                    cancelButtonText: 'Add another itinerary'
                })
                    .then(result => {
                        if (result.isConfirmed) {
                            navigate(`/myItineraries`)
                        }
                    })
                form.current.reset()
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    html: res.payload.response.message.join(' <br> '),
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
                        <h1 className="text-palette2 titleForm">New Itinerary</h1>
                        <div className='flex cardForm-children container-fluid'>
                            <img width='450px' className="flex align-center img-fluid" src="../img/newItinerary.png" alt="drawing" />
                            <div className='flex column gap-1 justify-center align-center container-fluid'>
                                <div className="input-wrapper flex column gap-1">
                                    <InputForm classN="signup-input" type="text" place="Name" id="name" refId={name} />
                                    <InputForm classN="signup-input" type="text" place='Url Photo 1' id="Photo1" refId={photo1} />
                                    <InputForm classN="signup-input" type="text" place='Url Photo 2' id="Photo2" refId={photo2} />
                                    <InputForm classN="signup-input" type="text" place='Url Photo 3' id="Photo3" refId={photo3} />
                                    <InputForm classN="signup-input" type="text" place="Description" id="description" refId={description} />
                                    <InputForm classN="signup-input" type="number" place="Price" id="price" refId={price} />
                                    <InputForm classN="signup-input" type="number" place="Duration" id="duration" refId={duration} />
                                    <label className='title-select' htmlFor='cityId'>Select a city :</label>
                                    <select ref={cityId} className="signup-input select" id="cityId">
                                        {cities.map(city => <option key={city._id} value={city._id}>{city.name}</option>)}
                                    </select>
                                </div>
                                <BotonEnviarForm fx={enviarForm} texto='Create Itinerary' />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
}
