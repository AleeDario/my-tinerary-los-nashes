import React, { useState, useEffect } from 'react'
import BotonFlecha from './BotonFlecha'
import { useSelector, useDispatch } from 'react-redux'
import cityActions from '../redux/actions/cityActions'
import hotelActions from '../redux/actions/hotelActions'

export default function Carousel() {
    const dispatch = useDispatch()
    const { cities} = useSelector(state => state.city)
    const { getAllCities} = cityActions
    const { getAllHotels} = hotelActions
    const { hotels } = useSelector(state => state.hotel)

    let [photosCarouselHoteles, setPhotosHoteles] = useState([])
    let [photosCarouselCiudades, setPhotosCiudades] = useState([])
    let [photosCarouselCiudades2, setPhotosCiudades2] = useState([])
    let [photosCarouselAll, setPhotosAll] = useState([])
    let [numeroCambiante, setNumeroCambiante] = useState(0)

    useEffect(() => {
        let idInterval = setInterval(() => {
            siguiente();
        }, 5000);
        return () => clearInterval(idInterval);
        // eslint-disable-next-line
    }, [numeroCambiante]);

    useEffect(() => {
        dispatch(getAllCities())
        dispatch(getAllHotels())
        // eslint-disable-next-line
    }, [])

    let siguiente = () => {
        if (numeroCambiante !== photosCarouselAll.length - 1) {
            setNumeroCambiante(++numeroCambiante)
        } else {
            setNumeroCambiante(0)
        }
    }

    let anterior = () => {
        if (numeroCambiante !== 0) {
            setNumeroCambiante(--numeroCambiante)
        } else {
            setNumeroCambiante(photosCarouselAll.length - 1)
        }
    }

    function numeroRandom(numero) {
        return Math.floor(Math.random() * numero)
    }
    // eslint-disable-next-line
    setPhotosHoteles = hotels.filter((hotel) => (photosCarouselHoteles.length < 4 && !photosCarouselHoteles.includes(hotel.photo)) && photosCarouselHoteles.push(hotel.photo[numeroRandom(hotel.photo.length - 1)]))

    // eslint-disable-next-line
    setPhotosCiudades = cities.filter(() => {
        let ciudadAleatoria = numeroRandom(cities.length - 1)
        if (photosCarouselCiudades.length < 4 && !photosCarouselCiudades.includes(cities[ciudadAleatoria].photo)) {
            photosCarouselCiudades.push(cities[ciudadAleatoria].photo)
        }
    })
    // eslint-disable-next-line
    setPhotosCiudades2 = cities.filter(() => {
        let ciudadAleatoria = numeroRandom(cities.length - 1)
        if (photosCarouselCiudades2.length < 4 && !photosCarouselCiudades2.includes(cities[ciudadAleatoria].photo) && !photosCarouselCiudades.includes(cities[ciudadAleatoria].photo)) {
            photosCarouselCiudades2.push(cities[ciudadAleatoria].photo)
        }
    })

    if (photosCarouselAll.length < 3) {
        // eslint-disable-next-line
        setPhotosAll = photosCarouselAll.push(photosCarouselCiudades, photosCarouselHoteles, photosCarouselCiudades2)
    }

    return (
        <>
            <div className="flex gap-2 caorusel justify-center align-center wrap bg-carousel">
                <BotonFlecha lado='left' fx={anterior} />
                {
                    photosCarouselAll[numeroCambiante].map((photo, index) => {
                        return (
                            <img key={index} className="border-radius-50" width="200px" height="200px" src={photo} alt={index} />
                        )
                    })
                }
                <BotonFlecha lado='rigth' fx={siguiente} />
            </div>
        </>
    )
}