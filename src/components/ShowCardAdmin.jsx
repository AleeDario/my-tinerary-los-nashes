import React from 'react'
import { useDispatch} from 'react-redux'
import Swal from 'sweetalert2'
import hotelActions from '../redux/actions/hotelActions'

export default function ShowCardAdmin(props) {
    let { shows } = props
    const dispatch = useDispatch()
    const { deleteShow, updateShow } = hotelActions

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
                    dispatch(deleteShow(shows._id))
                }
            })

        } catch (error) {
            console.log(error)
        }
    }

    async function updateAdmin() {
        try {
            const { value: formValues } = await Swal.fire({
                title: `Update Show \n ${shows.name} `,
                showCancelButton: true,
                confirmButtonText: 'Update',
                html:
                    '<input placeHolder="Name" id="name" class="swal2-input">' +
                    '<input placeHolder="Description" id="description" class="swal2-input">' +
                    '<input placeHolder="Photo Url" id="photo" class="swal2-input">' +
                    '<input placeHolder="Price" id="price" class="swal2-input">' +
                    '<input placeHolder="Date" id="date" class="swal2-input">' ,
                focusConfirm: false,
                preConfirm: () => {
                    let name = document.getElementById('name').value
                    let description = document.getElementById('description').value
                    let photo = document.getElementById('photo').value
                    let price = document.getElementById('price').value
                    let date = document.getElementById('date').value


                    let data = {
                        id: shows._id,
                        show: {

                        }
                    }

                    if(name !== ''){
                        data.show.name = name
                    }
                    if(photo !== ''){
                        data.show.photo = photo
                    }
                    if(description !== ''){
                        data.show.description = description
                    }
                    if(price !== ''){
                        data.show.price = price
                    }
                    if(date !== ''){
                        data.show.date = date
                    }


                    dispatch(updateShow(data))
                }
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
