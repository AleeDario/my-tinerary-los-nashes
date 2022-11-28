import React from 'react'
import { useDispatch, useSelector} from 'react-redux'
import Swal from 'sweetalert2'
import hotelActions from '../redux/actions/hotelActions'


export default function HotelCardAdmin(props) {
    let { hotel } = props
    const dispatch = useDispatch()
    const { token } = useSelector(state => state.user)
    const { deleteHotel, updateHotel } = hotelActions
    const { cities } = useSelector(state => state.city)

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
                        id: hotel._id,
                        token
                    }
                    dispatch(deleteHotel(data))
                }
            })

        } catch (error) {
            console.log(error)
        }
    }

    let citySelect = cities.find(city => city._id === hotel.cityId)

    async function updateAdmin() {
        try {
            const { value: formValues } = await Swal.fire({
                title: `Update Hotel \n ${hotel.name} `,
                showCancelButton: true,
                confirmButtonText: 'Update',
                html:
                    '<input placeHolder="Name" id="name" class="swal2-input">' +
                    '<input placeHolder="Photo 1 Url" id="photo1" class="swal2-input">' +
                    '<input placeHolder="Photo 2 Url" id="photo2" class="swal2-input">' +
                    '<input placeHolder="Photo 3 Url" id="photo3" class="swal2-input">' +
                    '<input placeHolder="Capacity" id="capacity" class="swal2-input">' +
                    `<select id='city' class="swal2-input"> 
                    ${cities.map(city => {
                        if(citySelect._id === city._id){
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
                    let capacity = document.getElementById('capacity').value
                    let city = document.getElementById('city').value

                    let data = {
                        id: hotel._id,
                        token,
                        hotels: {
                            cityId: city,

                        }
                    }

                    if(name !== ''){
                        data.hotels.name = name
                    }
                    if(photo1 !== ''){
                        photo.push(photo1)
                    }else{
                        photo.push(hotel.photo[0])
                    }
                    if(photo2 !== ''){
                        photo.push(photo2)
                    }else{
                        photo.push(hotel.photo[1])
                    }
                    if(photo3 !== ''){
                        photo.push(photo3)
                    }else{
                        photo.push(hotel.photo[2])
                    }
                    if(capacity !== ''){
                        data.hotels.capacity = capacity
                    }
                    if(photo !== []){
                        data.hotels.photo = photo
                    }else{
                        data.hotels.photo = hotel.photo
                    }

                    dispatch(updateHotel(data))

                    return `The hotel ${name} has been updated successfully.`
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
                    src={hotel.photo[numeroRandom(hotel.photo.length - 1)]}
                    alt={hotel.name} />
            </div>
            <div className="text-card">
                <h3>{hotel.name}</h3>
                <h4>City: {citySelect.name}</h4>
                <p>Capacity: {hotel.capacity}</p>
            </div>
            <div className='flex container-fluid align-center justify-around m-b-2'>
                <button className="bg-palette5" onClick={updateAdmin}>Update</button>
                <button className="bg-palette2" onClick={deleteAdmin}>Delete</button>
            </div>

        </div>
    )
}