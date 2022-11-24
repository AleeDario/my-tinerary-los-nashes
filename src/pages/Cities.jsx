import React, { useRef, useState, useEffect } from 'react'
import Checkbox from '../components/Checkbox'
import CityCard from '../components/CityCard'
import { useDispatch, useSelector } from 'react-redux'
import cityActions from '../redux/actions/cityActions'


export default function Cities() {

    const dispatch = useDispatch()
    const { cities, checks, name, checked, continent } = useSelector(state => state.city)
    const { getAllCities, getCitiesFiltred } = cityActions

    let [checksbox, setChecks] = useState([])
    const searchId = useRef()
    const inputCheck = useRef()

    useEffect(() => {
        if (checks || name) {
            let info = {
                checks, name, checked
            }
            dispatch(getCitiesFiltred(info))
            searchId.current.value = name
            if (checked) {
                checked.forEach(check => {
                    let input = Array.from(inputCheck.current).find(input => input.value === check)
                    input.checked = true
                })
            }

        } else {
            dispatch(getAllCities())
        }
        // eslint-disable-next-line
    }, [])

    function filterCheckCards(event) {

        let filter = filterCheck(event)

        let checked = filter

        filter = filter.map((check) => `continent=${check}`).join('&')

        let data = {
            name: searchId.current.value,
            checks: filter,
            checked: checked
        }

        dispatch(getCitiesFiltred(data))
    }

    function filterCheck(event) {
        let checkFiltered = []
        if (event.target.checked) {
            checkFiltered = [...checked, event.target.name]
        } else {
            checkFiltered = checksbox.filter((check) => check !== event.target.name)
        }

        setChecks(checkFiltered)

        return checkFiltered
    }

    return (
        <div className="cities-container flex m-t-16">
            <img className='imgFondo' src='../img/fondo.jpg' alt='fondo-img' />
            <div className="category-container flex column bg-palette2 p-2 gap-2 text-white w-20 h-50">
                <form >
                    <label>
                        <input className="search-input w-100" type="search" name="search" id="search" placeholder="Search" ref={searchId} onChange={filterCheckCards} />
                    </label>
                </form>
                <form className='flex column gap-2 p-1' ref={inputCheck}>
                    {continent.map((continente, index) => {
                        return <Checkbox continent={continente} valor={continente} fx={filterCheckCards} key={index} />
                    })}
                </form>
            </div>

            <div className="cards-container container-fluid w-90 flex wrap gap-2 justify-center align-center">

                {cities.length > 0 ? (
                    cities.map((city, index) => {
                        return <CityCard city={city} key={index} />
                    }))
                    : (
                        <img className='img-fluid' width='100%' src="./img/notsearch.png" alt="Not Found Search" />
                    )}
            </div>
        </div>
    )
}
