import React from 'react'
import { useDispatch, useSelector} from 'react-redux'
import Swal from 'sweetalert2'
import cityActions from '../redux/actions/cityActions'

export default function ItineraryCardAdmin(props) {
    let { itineraries } = props
    const dispatch = useDispatch()
    const { deleteItinerary, updateItinerary } = cityActions
    const { cities } = useSelector(state => state.city)
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
                        id: itineraries._id,
                        token
                    }
                    dispatch(deleteItinerary(data))
                }
            })

        } catch (error) {
            console.log(error)
        }
    }

    async function updateAdmin() {

        let citySelect = cities.find(city => city._id === itineraries.cityId)
        try {
            const { value: formValues } = await Swal.fire({
                title: `Update itinerary \n ${itineraries.name} `,
                showCancelButton: true,
                confirmButtonText: 'Update',
                html:
                    `<input value='${itineraries.name}' id="name" class="swal2-input">` +
                    `<input value='${itineraries.photo[0]}' id="photo1" class="swal2-input">` +
                    `<input value='${itineraries.photo[1]}' id="photo2" class="swal2-input">` +
                    `<input value='${itineraries.photo[2]}' id="photo3" class="swal2-input">` +
                    `<input value='${itineraries.description}' id="description" class="swal2-input">` +
                    `<input value='${itineraries.price}' id="price" class="swal2-input">` +
                    `<input value='${itineraries.duration}' id="duration" class="swal2-input">` +
                    `<select id='city' class="swal2-input"> 
                    ${cities.map(city => {
                        if(citySelect.name === city.name){
                            return `<option selected value="${city._id}">${city.name}</option>`
                        }else{
                            return `<option value="${city._id}">${city.name}</option>`
                        }})} 
                    </select>`,
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
                    let city = document.getElementById('city').value


                    let data = {
                        id: itineraries._id,
                        token,
                        itinerary: {
                            cityId: city,

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

                    return `The itinerary ${name} has been updated successfully.`
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

    let city = cities.find(city => city._id === itineraries.cityId)

    return (
        <div className="card-container bg-palette1 flex column justify-center" >
            <div className="img-card-container">
                <img className="img-card"
                    src={itineraries.photo[numeroRandom(itineraries.photo.length - 1)]}
                    alt={itineraries.name} />
            </div>
            <div className="text-card">
                <h3>{itineraries.name}</h3>
                <h4>City: {city.name}</h4>
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
