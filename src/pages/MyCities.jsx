import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cityActions from '../redux/actions/cityActions'
import CityCardAdmin from '../components/CityCardAdmin'
import AddCard from '../components/AddCard'

export default function MyCities() {

    const dispatch = useDispatch()
    const { citiesAdmin } = useSelector(state => state.city)
    const { getCitiesAdmin } = cityActions
    const { id } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getCitiesAdmin(id))
        // eslint-disable-next-line
    }, [])

    return (
        <div className="cities-container flex m-t-16">
            <img className='imgFondo' src='../img/fondo.jpg' alt='fondo-img' />
            <div className="cards-container container-fluid w-90 flex wrap gap-2 justify-center align-center">
                <AddCard text='city' reDirect='/newcity' />
                {citiesAdmin.length > 0 && (
                    citiesAdmin.map((city, index) => {
                        return <CityCardAdmin city={city} key={index} idAdm={id}/>
                    }))}
            </div>
        </div>
    )
}