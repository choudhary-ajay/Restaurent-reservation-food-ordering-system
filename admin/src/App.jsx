import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/list'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Login from './components/Login'
import { ToastContainer,} from 'react-toastify';
import Reservations from './pages/Reservations'

export const backendurl=import.meta.env.VITE_BACKEND_URL
export const currency="₹"


const App = () => {
  const [token, setToken] = useState("")
  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer/>
      {token === "" ? <Login setToken={setToken}/> :
        <div className=''>
          <Navbar setToken={setToken}/>
          <hr />
          <div className='w-full flex'>
            <Sidebar />
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
              <Routes>
                <Route path='/add' element={<Add token={token} />}></Route>
                <Route path='/list' element={<List token={token}/>}></Route>
                <Route path='/orders' element={<Orders token={token} />}></Route>
                <Route path='/reservations' element={<Reservations token={token}/>}></Route>
              </Routes>
            </div>
          </div>
        </div>}
    </div>


  )
}

export default App