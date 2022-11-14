import React from 'react'

export default function IconFooter(props) {
    let {url, classImg, srcImage, texto} = props
  return (
    <a className="text-white text-decoration" href={url}><img className={classImg} src={srcImage} alt="" />{texto}</a>
  )
}