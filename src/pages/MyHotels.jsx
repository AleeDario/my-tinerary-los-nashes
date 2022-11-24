import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import hotelActions from '../redux/actions/hotelActions'
import HotelCardAdmin from '../components/HotelCardAdmin'

export default function MyHotels() {

    const dispatch = useDispatch()
    const { hotelsAdmin } = useSelector(state => state.hotel)
    const { getHotelsAdmin } = hotelActions	

    let admId = '636d82c86529ebe93bbef91f'

    useEffect(() => {
        dispatch(getHotelsAdmin(admId))
        // eslint-disable-next-line
    }, [])

    return (
        <div className="cities-container flex m-t-16">
            <img className='imgFondo' src='../img/fondo.jpg' alt='fondo-img' />

            <div className="cards-container container-fluid w-90 flex wrap gap-2 justify-center align-center">

                {hotelsAdmin.length > 0 ? (
                    hotelsAdmin.map((hotel, index) => {
                        return <HotelCardAdmin hotel={hotel} key={index} idAdm={admId} />
                    }))
                    : (
                        <img className='img-fluid' width='100%' src="./img/notsearch.png" alt="Not Found Search" />
                    )}
            </div>
        </div>
    )
}