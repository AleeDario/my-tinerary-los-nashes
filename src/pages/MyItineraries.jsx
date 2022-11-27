import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cityActions from '../redux/actions/cityActions'
import ItineraryCardAdmin from '../components/ItineraryCardAdmin'

export default function MyItineraries() {
    const dispatch = useDispatch()
    const { itineraries} = useSelector(state => state.city)
    const { id} = useSelector(state => state.user)
    const { getItineraries} = cityActions	

    useEffect(() => {
        dispatch(getItineraries(id))
        // eslint-disable-next-line
    }, [])

    return (
        <div className="cities-container flex m-t-16">
            <img className='imgFondo' src='../img/fondo.jpg' alt='fondo-img' />
            <div className="cards-container container-fluid w-90 flex wrap gap-2 justify-center align-center">

                {itineraries.length > 0 && (
                    itineraries.map((itinerary, index) => {
                        return <ItineraryCardAdmin itineraries={itinerary} key={index} idAdm={id} />
                    }))
                }
            </div>
        </div>
    )
}
