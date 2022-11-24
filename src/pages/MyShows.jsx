import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import hotelActions from '../redux/actions/hotelActions'
import ShowCardAdmin from '../components/ShowCardAdmin'

export default function MyShows() {
    const dispatch = useDispatch()
    const { shows } = useSelector(state => state.hotel)
    const { getShows } = hotelActions

    let admId = '636d82c86529ebe93bbef91f'

    useEffect(() => {
        dispatch(getShows(admId))
        // eslint-disable-next-line
    }, [])

    return (
        <div className="cities-container flex m-t-16">
            <img className='imgFondo' src='../img/fondo.jpg' alt='fondo-img' />

            <div className="cards-container container-fluid w-90 flex wrap gap-2 justify-center align-center">

                {shows.length > 0 ? (
                    shows.map((show, index) => {
                        return <ShowCardAdmin shows={show} key={index} idAdm={admId} />
                    }))
                    : (
                        <img className='img-fluid' width='100%' src="./img/notsearch.png" alt="Not Found Search" />
                    )}
            </div>
        </div>
    )
}
