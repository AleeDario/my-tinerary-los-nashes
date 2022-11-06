import React from 'react'

export default function Boton(props) {
    let { verbo , funcion} = props

  return (
    <div className={`gray flecha  flex j-center a-center`} onClick={funcion}> {verbo} </div>
  )
}
