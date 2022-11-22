import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cityActions from '../redux/actions/cityActions'
import CityCardAdmin from '../components/CityCardAdmin'

export default function MyCities() {

    const dispatch = useDispatch()
    const { citiesAdmin } = useSelector(state => state.city)
    const { getCitiesAdmin } = cityActions

    let admId = '636d82c86529ebe93bbef91f'

    useEffect(() => {
        dispatch(getCitiesAdmin(admId))
        // eslint-disable-next-line
    }, [])

    return (
        <div className="cities-container flex m-t-16">
            <img className='imgFondo' src='../img/fondo.jpg' alt='fondo-img' />
            <div className="cards-container container-fluid w-90 flex wrap gap-2 justify-center align-center">

                {citiesAdmin.length > 0 ? (
                    citiesAdmin.map((city, index) => {
                        return <CityCardAdmin city={city} key={index} idAdm={admId}/>
                    }))
                    : (
                        <img className='img-fluid' width='100%' src="./img/notsearch.png" alt="Not Found Search" />
                    )}
            </div>
        </div>
    )
}
