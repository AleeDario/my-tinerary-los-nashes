import React from 'react'

export default function ScrollToTop() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }


  return (
    <img onClick={scrollToTop} className='img-w-3-5 scrollToTop' src="./img/top.png" alt="" />
  )
}
