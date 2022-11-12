import React from 'react'
import { Link as NavLink } from 'react-router-dom'

export default function CityCard(props) {
    let { city } = props

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
            <NavLink to={`/details/${city._id}`} style={{ textDecoration: 'none' }}>
                <button className="view-more">View more</button>
            </NavLink>

        </div>
    )
}
