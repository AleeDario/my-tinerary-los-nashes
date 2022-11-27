import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import hotelActions from '../redux/actions/hotelActions'

export default function ShowCardAdmin(props) {
    let { shows } = props
    const dispatch = useDispatch()
    const { deleteShow, updateShow } = hotelActions
    const { hotels } = useSelector(state => state.hotel)
    const { token } = useSelector(state => state.user)

    async function deleteAdmin() {
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    let data = {
                        id: shows._id,
                        token
                    }
                    dispatch(deleteShow(data))
                }
            })

        } catch (error) {
            console.log(error)
        }
    }

    let hotelSelect = hotels.find(hotel => hotel._id === shows.hotelId)

    async function updateAdmin() {
        try {
            const { value: formValues } = await Swal.fire({
                title: `Update Show \n ${shows.name} `,
                showCancelButton: true,
                confirmButtonText: 'Update',
                html:
                    `<input value=${shows.name} id="name" class="swal2-input">` +
                    `<input value=${shows.description} id="description" class="swal2-input">` +
                    `<input value=${shows.photo} id="photo" class="swal2-input">` +
                    `<input value=${shows.price} id="price" class="swal2-input">` +
                    `<input value=${shows.date} type='text' id="date" class="swal2-input">` +
                    `<select id='hotelId' class="swal2-input"> 
                    ${hotels.map(hotel => {
                        if (hotelSelect.name === hotel.name) {
                            return `<option selected value="${hotel._id}">${hotel.name}</option>`
                        } else {
                            return `<option value="${hotel._id}">${hotel.name}</option>`
                        }
                    })} 
                    </select>`,
                focusConfirm: false,
                preConfirm: () => {
                    let name = document.getElementById('name').value
                    let description = document.getElementById('description').value
                    let photo = document.getElementById('photo').value
                    let price = document.getElementById('price').value
                    let date = document.getElementById('date').value
                    let hotelId = document.getElementById('hotelId').value


                    let data = {
                        id: shows._id,
                        token,
                        show: {
                            hotelId,

                        }
                    }

                    if (name !== '') {
                        data.show.name = name
                    }
                    if (photo !== '') {
                        data.show.photo = photo
                    }
                    if (description !== '') {
                        data.show.description = description
                    }
                    if (price !== '') {
                        data.show.price = price
                    }
                    if (date !== '') {
                        data.show.date = date
                    }

                    dispatch(updateShow(data))

                    return `The show ${name} has been updated successfully.`
                },
                
            })

            if (formValues) {
                Swal.fire(JSON.stringify(formValues))
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="card-container bg-palette1 flex column justify-center" >
            <div className="img-card-container">
                <img className="img-card"
                    src={shows.photo}
                    alt={shows.name} />
            </div>
            <div className="text-card">
                <h3>{shows.name}</h3>
                <h4>Hotel: {hotelSelect.name}</h4>
                <p>Price: {shows.price}</p>
                <p>Date: {shows.date.split('T00:00:00.000Z')}</p>
            </div>
            <div className='flex container-fluid align-center justify-around m-b-2'>
                <button className="bg-palette5" onClick={updateAdmin}>Update</button>
                <button className="bg-palette2" onClick={deleteAdmin}>Delete</button>
            </div>

        </div>
    )
}
