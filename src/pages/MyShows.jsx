import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import hotelActions from '../redux/actions/hotelActions'
import ShowCardAdmin from '../components/ShowCardAdmin'
import AddCard from '../components/AddCard'

export default function MyShows() {
    const dispatch = useDispatch()
    const { shows } = useSelector(state => state.hotel)
    const { id } = useSelector(state => state.user)
    const { getShows } = hotelActions


    useEffect(() => {
        dispatch(getShows(id))
        // eslint-disable-next-line
    }, [])

    return (
        <div className="cities-container flex m-t-16">
            <img className='imgFondo' src='../img/fondo.jpg' alt='fondo-img' />

            <div className="cards-container container-fluid w-90 flex wrap gap-2 justify-center align-center">
                <AddCard text='show' reDirect='/newshow' />
                {shows.length > 0 && (
                    shows.map((show, index) => {
                        return <ShowCardAdmin shows={show} key={index} idAdm={id} />
                    }))}
            </div>
        </div>
    )
}
