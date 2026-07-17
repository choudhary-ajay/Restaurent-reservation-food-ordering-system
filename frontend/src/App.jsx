import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Menudisplay from './components/Menu'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import Reservstionform from './pages/Reservstionform'
import MyReservation from './pages/MyReservation'
import Menuitem from './pages/menuitem'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Contact from './pages/Contact'
import Footer from './components/footer'
import Verify from './pages/Verify'

function App() {
  
  return (
    <>
      <div>
        <ToastContainer autoClose={500}/>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/menu' element={<Menudisplay/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path='/reserve' element={<Reservstionform/>}></Route>
          <Route path='/myreservation' element={<MyReservation/>}></Route>
          <Route path='/menu/:id' element={<Menuitem/>}></Route>
          <Route path='/cart' element={<Cart/>}></Route>
          <Route path='/placeorder' element={<PlaceOrder/>}></Route>
          <Route path='/orders' element={<Orders/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
           <Route path="/verify" element={<Verify/>}></Route>
        </Routes>
        <Footer/>
      </div>
    </>
  )
}

export default App
