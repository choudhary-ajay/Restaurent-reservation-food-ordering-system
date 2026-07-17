import React from 'react'
import Hero from '../components/Hero'
import Menudisplay from '../components/Menu'
import Reservstionform from './Reservstionform'

const Home = () => {
  return (
    <div>
        <Hero/>
        <Menudisplay/>
        <Reservstionform/>
    </div>
  )
}

export default Home