import React from 'react'
import { Link as NavLink } from 'react-router-dom'

export default function HotelCard(props) {
    let { hotel} = props

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
                <p>Capacity: {hotel.capacity}</p>
            </div>
            <NavLink to={`/detailsH/${hotel._id}`} style={{ textDecoration: 'none' }}>
                <button className="view-more">View more</button>
            </NavLink>

        </div>
    )
}
