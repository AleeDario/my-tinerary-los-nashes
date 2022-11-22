import React from 'react'
import { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BotonEnviarForm from '../components/BotonEnviarForm'
import InputForm from '../components/InputForm'
import hotelActions from '../redux/actions/hotelActions'
import Swal from 'sweetalert2'
import cityActions from '../redux/actions/cityActions'


export default function NewHotel() {
    const form = useRef()
    const name = useRef()
    const photo1 = useRef()
    const photo2 = useRef()
    const photo3 = useRef()
    const capacity = useRef()
    const cityId = useRef()

    const dispatch = useDispatch()
    const { cities } = useSelector(state => state.city)
    const { createHotel } = hotelActions
    const { getAllCities } = cityActions

    useEffect(() => {

        dispatch(getAllCities())
        // eslint-disable-next-line
    }, [])

    async function enviarFormulario(event) {
        event.preventDefault()
        let newHotel = {
            name: name.current.value,
            photo: [photo1.current.value, photo2.current.value, photo3.current.value],
            capacity: capacity.current.value,
            cityId: cityId.current.value,
            userId: '636d82c86529ebe93bbef91f'
        }
        try {
            let res = await dispatch(createHotel(newHotel))
            if (res.payload.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Hotel successfully created',
                    showConfirmButton: true,
                })
                    .then(result => {
                        if (result.isConfirmed) {
                            window.location.href = `/detailsH/${res.payload.id}`
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
                                        {cities.map(city => <option key={city._id} value={city._id}>{city.name}</option>)}
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
