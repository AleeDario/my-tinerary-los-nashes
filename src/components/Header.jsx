import React from 'react'
import Navbar from './Navbar'

export default function Header() {
    return (
        <header className='w-100 vh-100'>
            <video src="./img/world.mp4" autoPlay muted loop></video>
            <Navbar />
        </header>
    )
}