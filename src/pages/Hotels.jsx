import React, { useRef, useState, useEffect } from 'react'
import HotelCard from '../components/HotelCard'
import axios from 'axios'
import apiUrl from '../api/url'


export default function Hotels() {

    let [hotelesFiltrados, setHotelesFiltrados] = useState([])
    const searchId = useRef()
    const selectId = useRef()

    useEffect(() => {
        axios.get(`${apiUrl}/api/hotels/`)
            .then(res => setHotelesFiltrados(res.data.response))
            .catch(err => console.log(err))

    }, [])

    function filterCheckCards() {
        let order = selectId.current.value
        if (order !== 'asc' && order !== 'desc') {
            order = 'asc'
        }
        let search = searchId.current.value
        axios.get(`${apiUrl}/api/hotels?name=${search}&order=${order}`)
            .then(res => setHotelesFiltrados(res.data.response))
    }

    return (
        <div className="cities-container flex m-t-16">
            <img className='imgFondo' src='../img/fondo.jpg' alt='fondo-img'/>
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

                {hotelesFiltrados.length > 0 ? (
                    hotelesFiltrados.map((hotel, index) => {
                        return <HotelCard hotel={hotel} key={index} />
                    }))
                    : (
                        <img className='img-fluid' width='100%' src="./img/notsearch.png" alt="Not Found Search" />
                    )}
            </div>
        </div>
    )
}
