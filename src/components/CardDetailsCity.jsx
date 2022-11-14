import React from 'react'

export default function CardDetailsCity(props) {
    let { ciudadFilt } = props
  return (
    <div className='flex'>
        <div>
            <img width='300px' src={ciudadFilt.photo} alt={ciudadFilt.name} />
        </div>
        <div className='flex column'>
            <h2>{ciudadFilt.name}</h2>
            <p>{ciudadFilt.continent}</p>
            <p>{ciudadFilt.population}</p>
        </div>
    </div>
  )
}
