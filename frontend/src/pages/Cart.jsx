import React, { useContext } from 'react'
import { MdDelete } from "react-icons/md";
import { reserveContext } from '../context/reserveContext';
import { useEffect } from 'react';
import { useState } from 'react';
import CartTotal from '../components/CartTotal';

const Cart = () => {
    const { product, navigate, cartItems, updateCart } = useContext(reserveContext)
    const [cartdata, setcartdata] = useState([])

    useEffect(() => {
        if (product.length > 0) {
            let tempdata = []
            for (let items in cartItems) {
                if (cartItems[items] > 0) {
                    tempdata.push({
                        _id: items,
                        quantity: cartItems[items]
                    })
                }
            }
            setcartdata(tempdata)

        }
    }, [cartItems, product])




    return (
        <div>
            <div className='max-w-6xl mx-7  lg:mx-auto'>
                <h1 className='text-4xl text-center my-7 text-white font-bold'>Your Cart</h1>
                {cartdata.length > 0 ? (cartdata.map((item, index) => {
                    const productdata = product.find((items) => items._id === item._id)
                    console.log(productdata)

                    return (
                        <div className='text-white flex items-center border-y py-2 border-white flex-col gap-5 sm:flex-row  justify-between'>
                            <div className='flex gap-5 items-center w-full'>
                                <img className='w-28 h-28' src={productdata.image} alt="" />
                                <div>
                                    <p className='text-orange-600 mb-3 font-bold text-xl'>{productdata.name}</p>
                                    <p className='font-bold'>₹{productdata.price}</p>
                                </div>
                            </div>
                            <div className='flex justify-between w-full sm:w-1/2'>
                                <input className='bg-white w-28 text-center border-orange-600 rounded-sm border-2 text-black px-2' min={1} onChange={(e) => { e.target.value === "" || e.target.value === 0 ? null : updateCart(item._id, Number(e.target.value)) }} type="number" defaultValue={item.quantity} />
                            <MdDelete color='white' onClick={() => { updateCart(item._id, 0) }} size={40} className='' />
                            </div>
                        </div>)
                })) : (<div className='text-2xl text-white font-semibold'>Your cart is empty</div>)}

            </div>
            <div className='flex max-w-6xl mx-7 lg:mx-auto text-white  mt-20 justify-end'>
                <div className='w-full md:w-120'>
                    <CartTotal />
                </div>
            </div>
            <div className='max-w-6xl mx-7 lg:mx-auto text-end mt-5 mb-10'>
                <button onClick={() => { navigate("/placeorder") }} className='bg-white px-5 font-semibold  cursor-pointer py-2 text-black'>PROCEED TO CHECKOUT</button>
            </div>

        </div>

    )
}

export default Cart