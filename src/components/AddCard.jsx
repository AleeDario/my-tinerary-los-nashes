import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddCard(props) {

    const navigate = useNavigate()
    let { text , reDirect} = props

    function redirect() {
        navigate(`${reDirect}`)
    }

    return (
        <div className="card-container bg-palette1 flex column justify-center text-white align-center gap-2">
                <img onClick={redirect} className="img-card add" src="../img/add.png" alt='img-add' />
                <h2>Add a new {text}</h2>
        </div>
    )
}
