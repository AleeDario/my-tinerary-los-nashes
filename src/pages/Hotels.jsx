import React, { useRef, useState, useEffect } from 'react'
import HotelCard from '../components/HotelCard'

export default function Hotels() {

    let [hoteles, setHoteles] = useState([])
    let [hotelesFiltrados, setHotelesFiltrados] = useState([])
    const searchId = useRef()
    const selectId = useRef()

    useEffect(() => {
        fetch('../places.json')
            .then(response => response.json())
            .then(response => setHoteles(response))

        fetch('../places.json')
            .then(response => response.json())
            .then(response => setHotelesFiltrados(response))
    }, [])

    
    function filterCheckCards() {

        let orderFiltered = sortHotels()
        let searchFiltered = filterSearch(orderFiltered)
        localStorage.setItem('searchFiltrados', JSON.stringify(searchFiltered))
        setHotelesFiltrados(searchFiltered)
        console.log(searchFiltered)
        localStorage.setItem('hotelesFiltrados', JSON.stringify(searchFiltered))
    }

    function sortHotels() {
        let hotelesOrdenados
        let order = selectId.current.value
        if(order !== 'default'){
            if (order === 'asc') {
                hotelesOrdenados = hoteles.sort((a, b) => a.capacity - b.capacity).map((hotel) => hotel)
            } else if (order === 'desc') {
                hotelesOrdenados = hoteles.sort((a, b) => b.capacity - a.capacity).map((hotel) => hotel)
            }
            setHotelesFiltrados(hotelesOrdenados)
            return hotelesOrdenados
        } else {
            return hoteles
        }
    }

    function filterSearch(array) {
        if (searchId.current.value !== '') {
            let hotelesFiltrados = array.filter((hotel) => hotel.name.toLowerCase().includes(searchId.current.value.toLowerCase()))
            return hotelesFiltrados
        } else {
            return array
        }
    }

    return (
        <div className="cities-container flex m-t-16">
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
