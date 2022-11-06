import React, { useState, useEffect } from 'react'
import BotonFlecha from './BotonFlecha'

export default function Carousel() {

    let [ciudades, setCiudades] = useState([])
    let [hoteles, setHoteles] = useState([])
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
        fetch('../cities.json')
            .then(response => response.json())
            .then(response => setCiudades(response))

        fetch('../places.json')
            .then(response => response.json())
            .then(response => setHoteles(response))
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
    setPhotosHoteles = hoteles.filter((hotel) => (photosCarouselHoteles.length < 4 && !photosCarouselHoteles.includes(hotel.photo)) && photosCarouselHoteles.push(hotel.photo[numeroRandom(hotel.photo.length - 1)]))

    // eslint-disable-next-line
    setPhotosCiudades = ciudades.filter(() => {
        let ciudadAleatoria = numeroRandom(ciudades.length - 1)
        if (photosCarouselCiudades.length < 4 && !photosCarouselCiudades.includes(ciudades[ciudadAleatoria].photo)) {
            photosCarouselCiudades.push(ciudades[ciudadAleatoria].photo)
        }
    })
    // eslint-disable-next-line
    setPhotosCiudades2 = ciudades.filter(() => {
        let ciudadAleatoria = numeroRandom(ciudades.length - 1)
        if (photosCarouselCiudades2.length < 4 && !photosCarouselCiudades2.includes(ciudades[ciudadAleatoria].photo) && !photosCarouselCiudades.includes(ciudades[ciudadAleatoria].photo)) {
            photosCarouselCiudades2.push(ciudades[ciudadAleatoria].photo)
        }
    })

    if (photosCarouselAll.length < 3) {
        // eslint-disable-next-line
        setPhotosAll = photosCarouselAll.push(photosCarouselCiudades, photosCarouselHoteles, photosCarouselCiudades2)
    }

    return (
        <>
            <div className="flex gap-2 caorusel p-3 justify-center align-center wrap bg-carousel">
                <BotonFlecha lado='left' fx={anterior} />
                {
                    photosCarouselAll[numeroCambiante].map((photo, index) => {
                        return (
                            <img className="border-radius-50" width="250px" height="250px" src={photo} alt={index} />
                        )
                    })
                }
                <BotonFlecha lado='rigth' fx={siguiente} />
            </div>
        </>
    )
}