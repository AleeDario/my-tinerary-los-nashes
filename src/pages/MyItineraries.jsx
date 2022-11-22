import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cityActions from '../redux/actions/cityActions'
import ItineraryCardAdmin from '../components/ItineraryCardAdmin'

export default function MyItineraries() {
    const dispatch = useDispatch()
    const { itineraries } = useSelector(state => state.city)
    const { getItineraries } = cityActions	

    let admId = '636d82c86529ebe93bbef91f'

    useEffect(() => {
        dispatch(getItineraries(admId))
        // eslint-disable-next-line
    }, [])

    return (
        <div className="cities-container flex m-t-16">
            <img className='imgFondo' src='../img/fondo.jpg' alt='fondo-img' />

            <div className="cards-container container-fluid w-90 flex wrap gap-2 justify-center align-center">

                {itineraries.length > 0 ? (
                    itineraries.map((itinerary, index) => {
                        return <ItineraryCardAdmin itineraries={itinerary} key={index} idAdm={admId} />
                    }))
                    : (
                        <img className='img-fluid' width='100%' src="./img/notsearch.png" alt="Not Found Search" />
                    )}
            </div>
        </div>
    )
}
