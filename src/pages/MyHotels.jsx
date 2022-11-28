import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import hotelActions from '../redux/actions/hotelActions'
import HotelCardAdmin from '../components/HotelCardAdmin'
import AddCard from '../components/AddCard'

export default function MyHotels() {

    const dispatch = useDispatch()
    const { hotelsAdmin } = useSelector(state => state.hotel)
    const { getHotelsAdmin } = hotelActions
    const { id } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getHotelsAdmin(id))
        // eslint-disable-next-line
    }, [])

    return (
        <div className="cities-container flex m-t-16">
            <img className='imgFondo' src='../img/fondo.jpg' alt='fondo-img' />

            <div className="cards-container container-fluid w-90 flex wrap gap-2 justify-center align-center">
                <AddCard text='hotel' reDirect='/newhotel' />
                {hotelsAdmin.length > 0 && (
                    hotelsAdmin.map((hotel, index) => {
                        return <HotelCardAdmin hotel={hotel} key={index} idAdm={id} />
                    }))}
            </div>
        </div>
    )
}