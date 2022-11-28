import { useRef } from 'react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import hotelActions from '../redux/actions/hotelActions'
import Swal from 'sweetalert2'
import BotonEnviarForm from '../components/BotonEnviarForm'
import InputForm from '../components/InputForm'
import { useNavigate } from 'react-router-dom'

export default function NewShow() {

    const form = useRef()
    const name = useRef()
    const photo = useRef()
    const description = useRef()
    const date = useRef()
    const price = useRef()
    const hotelId = useRef()
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const { createShow } = hotelActions
    const { hotels } = useSelector(state => state.hotel)
    const { token, id } = useSelector(state => state.user)

    async function enviarForm(e) {
        e.preventDefault()
        let datos = {
            token,
            show: {
                name: name.current.value,
                photo: photo.current.value,
                description: description.current.value,
                price: price.current.value,
                date: date.current.value,
                hotelId: hotelId.current.value,
                userId: id
            }
        }

        try {
            let res = await dispatch(createShow(datos))
            if (res.payload.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Show successfully created',
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'See my shows',
                    cancelButtonText: 'Add another show',
                })
                    .then(result => {
                        if (result.isConfirmed) {
                            navigate(`/myshows`)
                        }
                    })
                form.current.reset()
            } else {
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
                        <h1 className="text-palette2 titleForm">New Show</h1>
                        <div className='flex cardForm-children container-fluid'>
                            <img width='450px' className="flex align-center img-fluid" src="../img/newShow.png" alt="drawing" />
                            <div className='flex column gap-1 justify-center align-center container-fluid'>
                                <div className="input-wrapper flex column gap-1">
                                    <InputForm classN="signup-input" type="text" place="Name" id="name" refId={name} />
                                    <InputForm classN="signup-input" type="text" place="Description" id="description" refId={description} />
                                    <InputForm classN="signup-input" type="text" place='Url Photo' id="Photo" refId={photo} />
                                    <InputForm classN="signup-input" type="number" place="Price" id="price" refId={price} />
                                    <InputForm classN="signup-input" type="date" place="Date" id="date" refId={date} />
                                    <label className='title-select' htmlFor='hotelId'>Select a Hotel :</label>
                                    <select ref={hotelId} className="signup-input select" id="hotelId">
                                        {hotels.map(hotel => <option key={hotel._id} value={hotel._id}>{hotel.name}</option>)}
                                    </select>
                                </div>
                                <BotonEnviarForm fx={enviarForm} texto='Create Show' />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
}
