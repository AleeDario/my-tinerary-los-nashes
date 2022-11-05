import React from 'react'
import { Link as NavLink } from 'react-router-dom'

export default function CallToAction(props) {
    let { rute, classN, text } = props

    return (
        <NavLink to={rute} style={{ textDecoration: 'none' }}>
            <button className={classN}>{text}</button>
        </NavLink>
    )
}