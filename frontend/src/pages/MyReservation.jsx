import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { reserveContext } from '../context/reserveContext'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import axios from 'axios'

const MyReservation = () => {
    const { backendurl, token } = useContext(reserveContext)
    const [reservations, setreservations] = useState([])

    const fetchreservation = async () => {
        try {
            const res = await axios.post(backendurl + "/api/reservation/get", {}, { headers: { token } })
            if (res.data.success) {
                setreservations(res.data.reservation)
            }
            else {
                toast.error(res.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const deletereservation = async (id) => {
        let confirmdelet = confirm("are you sure to delet the reservation")
        if (confirmdelet) {
            try {
                const res = await axios.post(backendurl + "/api/reservation/cancel", { id }, { headers: { token } })
                if (res.data.success) {
                    toast.success(res.data.message)
                } else {
                    toast.error(res.data.message)
                }
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }
    useEffect(() => {
        if (token) {
            fetchreservation()
        }
    }, [token, deletereservation])
    return (
        <div className='max-w-6xl m-4 sm:mx-auto '>
            <h1 className='sm:text-4xl text-3xl text-white font-bold mx-auto text-center mb-4'>My Reservations</h1>
            {reservations.length>0 ? (<div className='w-full grid font-bold bg-amber-600 gap-2 text-white px-5 sm:text-xl place-items-center py-3 text-base rounded-t-md border-white justify-center grid-cols-[2fr_3fr_1fr_1fr]'>
                <h3 className=''>Date</h3>
                <h3>Time</h3>
                <h3>Guests</h3>
                <h3>Cancel</h3>
                </div>):(<div className='text-orange-600 font-bold text-2xl text-center my-10 mx-auto '>You Don't have any Reservation</div>)}
            {reservations.map((item, index) => <div key={index} className='w-full grid  place-items-center text-sm sm:text-base border-b border-gray-700 bg-white text-black px-5 py-3  justify-center grid-cols-[2fr_3fr_1fr_1fr]'>
                <h3 className=''>{item.date}</h3>
                <h3>{item.time}</h3>
                <h3>{item.guests}</h3>
                <button onClick={() => { deletereservation(item._id) }} className='bg-linear-to-tr w-fit text-white from-orange-700 font-semibold active:bg-orange-500 cursor-pointer  to-amber-400 px-2 sm:px-4 py-1 rounded-lg'>Cancel</button>
            </div>
            )}
        </div>
    )
}

export default MyReservation