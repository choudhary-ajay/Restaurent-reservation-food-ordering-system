import React, { useContext } from 'react'
import { reserveContext } from '../context/reserveContext'

const CartTotal = () => {
    const {getCartTotal,navigate}=useContext(reserveContext)
    return (
       
            <div className="carttotal w-full ">
                <h2 className='text-3xl flex items-center font-bold mb-3'>Cart Total <span className='h-0.5  inline-block mx-2 w-12 bg-white'></span></h2>
                <div className='flex py-2 justify-between w-full border-b-2 border-white'>
                    <p>Subtotal</p>
                    <p>{getCartTotal()}</p>
                </div>
                 <div className='flex py-2 justify-between w-full border-b-2 border-white'>
                    <p>Shipping Fee</p>
                    <p>₹ 10</p>
                </div>
                <div className='flex py-2 text-[18px] justify-between font-bold w-full border-white'>
                    <p>Total</p>
                    <p>{getCartTotal()+10}</p>
                </div>
 
    

            </div>
    )
}

export default CartTotal