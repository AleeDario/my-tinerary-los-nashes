import React from 'react'
import { useDispatch} from 'react-redux'
import Swal from 'sweetalert2'
import cityActions from '../redux/actions/cityActions'

export default function ItineraryCardAdmin(props) {
    let { itineraries } = props
    const dispatch = useDispatch()
    const { deleteItinerary, updateItinerary } = cityActions

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
                    dispatch(deleteItinerary(itineraries._id))
                    window.location.reload()
                }
            })

        } catch (error) {
            console.log(error)
        }
    }

    async function updateAdmin() {
        try {
            const { value: formValues } = await Swal.fire({
                title: `Update itinerary \n ${itineraries.name} `,
                showCancelButton: true,
                confirmButtonText: 'Update',
                html:
                    '<input placeHolder="Name" id="name" class="swal2-input">' +
                    '<input placeHolder="Photo 1 Url" id="photo1" class="swal2-input">' +
                    '<input placeHolder="Photo 2 Url" id="photo2" class="swal2-input">' +
                    '<input placeHolder="Photo 3 Url" id="photo3" class="swal2-input">' +
                    '<input placeHolder="Description" id="description" class="swal2-input">' +
                    '<input placeHolder="Price" id="price" class="swal2-input">' +
                    '<input placeHolder="Duration" id="duration" class="swal2-input">' ,
                focusConfirm: false,
                preConfirm: () => {
                    let name = document.getElementById('name').value
                    let photo1 = document.getElementById('photo1').value
                    let photo2 = document.getElementById('photo2').value
                    let photo3 = document.getElementById('photo3').value
                    let photo = []
                    let description = document.getElementById('description').value
                    let price = document.getElementById('price').value
                    let duration = document.getElementById('duration').value


                    let data = {
                        id: itineraries._id,
                        itinerary: {

                        }
                    }

                    if(name !== ''){
                        data.itinerary.name = name
                    }
                    if(photo1 !== ''){
                        photo.push(photo1)
                    }else{
                        photo.push(itineraries.photo[0])
                    }
                    if(photo2 !== ''){
                        photo.push(photo2)
                    }else{
                        photo.push(itineraries.photo[1])
                    }
                    if(photo3 !== ''){
                        photo.push(photo3)
                    }else{
                        photo.push(itineraries.photo[2])
                    }
                    if(photo !== []){
                        data.itinerary.photo = photo
                    }else{
                        data.itinerary.photo = itineraries.photo
                    }
                    if(description !== ''){
                        data.itinerary.description = description
                    }
                    if(price !== ''){
                        data.itinerary.price = price
                    }
                    if(duration !== ''){
                        data.itinerary.duration = duration
                    }


                    dispatch(updateItinerary(data))
                    window.location.reload()
                }
            })

            if (formValues) {
                Swal.fire(JSON.stringify(formValues))
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    function numeroRandom(numero) {
        return Math.floor(Math.random() * numero)
    }

    return (
        <div className="card-container bg-palette1 flex column justify-center" >
            <div className="img-card-container">
                <img className="img-card"
                    src={itineraries.photo[numeroRandom(itineraries.photo.length - 1)]}
                    alt={itineraries.name} />
            </div>
            <div className="text-card">
                <h3>{itineraries.name}</h3>
                <p>Price: {itineraries.price}</p>
                <p>Duration: {itineraries.duration}</p>
            </div>
            <div className='flex container-fluid align-center justify-around m-b-2'>
                <button className="bg-palette5" onClick={updateAdmin}>Update</button>
                <button className="bg-palette2" onClick={deleteAdmin}>Delete</button>
            </div>

        </div>
    )
}
