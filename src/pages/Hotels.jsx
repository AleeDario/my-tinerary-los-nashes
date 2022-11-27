import React, { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HotelCard from '../components/HotelCard'
import hotelActions from '../redux/actions/hotelActions'

export default function Hotels() {
    const dispatch = useDispatch()
    const { hotels, name, order } = useSelector(state => state.hotel)
    const { getAllHotels, getHotelsFiltered } = hotelActions;
    const searchId = useRef()
    const selectId = useRef()

    useEffect(() => {
        if (name || order) {
            let data = {
                name,
                order
            }
            dispatch(getHotelsFiltered(data))
            searchId.current.value = name
            selectId.current.value = order
        } else {
            dispatch(getAllHotels())
        }
        // eslint-disable-next-line
    }, [])

    function filterCheckCards() {
        let order = selectId.current.value
        if (order !== 'asc' && order !== 'desc') {
            order = 'asc'
        }
        let data = {
            name: searchId.current.value,
            order
        }

        dispatch(getHotelsFiltered(data))
        
        }

        return (
            <div className="cities-container flex m-t-16">
                <img className='imgFondo' src='../img/fondo.jpg' alt='fondo-img' />
                <form className="category-container flex column bg-palette2 p-2 gap-2 text-white w-20 h-50" method="get">
                    <label>
                        <input className="search-input w-100" type="search" name="search" id="search" placeholder="Search" ref={searchId} onChange={filterCheckCards} />
                    </label>
                    <label>Choose a Order:
                        <select name="select" defaultValue={'default'} onChange={filterCheckCards} ref={selectId}>
                            <option value='default' disabled>Select a capacity order:</option>
                            <option value="asc">Ascendent</option>
                            <option value="desc">Descendent</option>
                        </select>
                    </label>
                </form>

                <div className="cards-container container-fluid w-90 flex wrap gap-2 justify-center align-center">

                    {hotels.length > 0 ? (
                        hotels.map((hotel, index) => {
                            return <HotelCard hotel={hotel} key={index} />
                        }))
                        : (
                            <img className='img-fluid' width='100%' src="./img/notsearch.png" alt="Not Found Search" />
                        )}
                </div>
            </div>
        )
    }