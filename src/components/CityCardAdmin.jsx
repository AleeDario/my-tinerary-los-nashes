import React from 'react'
import { useDispatch} from 'react-redux'
import cityActions from '../redux/actions/cityActions'
import Swal from 'sweetalert2'

export default function CityCardAdmin(props) {
    let { city } = props
    const dispatch = useDispatch()
    const { deleteCity, updateCity } = cityActions

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
                    dispatch(deleteCity(city._id))
                }
            })

        } catch (error) {
            console.log(error)
        }
    }

    async function updateAdmin() {
        try {
            const { value: formValues } = await Swal.fire({
                title: `Update City \n ${city.name} `,
                showCancelButton: true,
                confirmButtonText: 'Update',
                html:
                    '<input placeHolder="Name" id="name" class="swal2-input">' +
                    '<input placeHolder="Continent"id="continent" class="swal2-input">' +
                    '<input placeHolder="Photo Url"id="photo" class="swal2-input">' +
                    '<input placeHolder="Population"id="population" class="swal2-input">',
                focusConfirm: false,
                preConfirm: () => {
                    let name = document.getElementById('name').value
                    let continent = document.getElementById('continent').value
                    let photo = document.getElementById('photo').value
                    let population = document.getElementById('population').value

                    let data = {
                        id: city._id,
                        citie: {

                        }
                    }

                    if(name !== ''){
                        data.citie.name = name
                    }
                    if(continent !== ''){
                        data.citie.continent = continent
                    }

                    if(photo !== ''){
                        data.citie.photo = photo
                    }

                    if(population !== ''){
                        data.citie.population = population
                    }

                    dispatch(updateCity(data))
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
        <div className="card-container bg-palette1 flex column justify-center">
            <div className="img-card-container">
                <img className="img-card"
                    src={city.photo}
                    alt={city.name} />
            </div>
            <div className="text-card">
                <h3>{city.name}</h3>
                <p>Continent: {city.continent}</p>
                <p>Population: {city.population}</p>
            </div>
            <div className='flex container-fluid align-center justify-around m-b-2'>
                <button className="bg-palette5" onClick={updateAdmin}>Update</button>
                <button className="bg-palette2" onClick={deleteAdmin}>Delete</button>
            </div>


        </div>
    )
}


