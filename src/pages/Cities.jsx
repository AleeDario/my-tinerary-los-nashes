import axios from 'axios'
import React, { useRef, useState, useEffect } from 'react'
import Checkbox from '../components/Checkbox'
import CityCard from '../components/CityCard'

export default function Cities() {

    let [ciudades, setCiudades] = useState([])
    let [ciudadesFiltradas, setCiudadesFiltradas] = useState([])
    let [checks, setChecks] = useState([])
    const searchId = useRef()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/cities/`)
            .then(res => setCiudades(res.data.data))
            .catch(err => console.log(err))

        axios.get(`http://localhost:8000/api/cities/`)
            .then(res => setCiudadesFiltradas(res.data.data))
            .catch(err => console.log(err))

    }, [])

    let checkCiudades = [...new Set(ciudades.map((ciudad) => ciudad.continent))]

    function filterCheckCards(event) {

        let checkFiltered = filterCheck(event)
        let urlChecks = checkFiltered.map((check) => `continent=${check}`).join('&')

        axios.get(`http://localhost:8000/api/cities?${urlChecks}&name=${searchId.current.value}`)
            .then(res => setCiudadesFiltradas(res.data.data))
    }

    function filterCheck(event) {
        let checkFiltered = []
        if(event.target.checked) {
            checkFiltered =  [...checks, event.target.name]
        } else {
            checkFiltered = checks.filter((check) => check !== event.target.name)
        }

        setChecks(checkFiltered)

        return checkFiltered
    }

    return (
        <div className="cities-container flex m-t-16">
            <form className="category-container flex column bg-palette2 p-2 gap-2 text-white w-20 h-50" method="get">
                <label>
                    <input className="search-input w-100" type="search" name="search" id="search" placeholder="Search" ref={searchId} onChange={filterCheckCards} />
                </label>

                {checkCiudades.map((continente, index) => {
                    return <Checkbox continent={continente} valor={continente} fx={filterCheckCards} key={index} />
                })}
            </form>

            <div className="cards-container container-fluid w-90 flex wrap gap-2 justify-center align-center">

                {ciudadesFiltradas.length > 0 ? (
                    ciudadesFiltradas.map((city, index) => {
                        return <CityCard city={city} key={index} />
                    }))
                    : (
                        <img className='img-fluid' width='100%' src="./img/notsearch.png" alt="Not Found Search" />
                    )}
            </div>
        </div>
    )
}
