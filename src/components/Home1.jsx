import React from 'react'
import Header from './Header'
import CallToAction from './CallToAction'

export default function Home1() {
  return (
    <div className='w-100 vh-100'>
      <Header />
      <div className="sub-main">
        <div className="flex justify-center align-center">
          <div className="flex column align-center gap-1-5">
            <h1 className="text-center text-white ">MyTinerary</h1>
            <h2 className="text-center text-white ">Find your perfect trip, designed by insiders who know and love their cities!</h2>
            <div className="flex gap-1-5 buttons-mid">
              <CallToAction rute='/cities' classN='shadow__btn' text='CITIES' />
              <CallToAction rute='/hotels' classN='shadow__btn' text='HOTELS' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}