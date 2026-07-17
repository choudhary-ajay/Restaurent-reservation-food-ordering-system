import { NavLink } from 'react-router-dom'

import { useContext, useState } from 'react'
import { reserveContext } from '../context/reserveContext'


const Menudisplay = () => {
    const { categoryItem, product, addtocart } = useContext(reserveContext)
    const [category, setcategory] = useState("All")
    return (
        <div className='w-full px-4 lg:px-12 '>
            <div id='menu' className='bg-black my-5 rounded-2xl max-w-6xl py-12 mx-auto '>
                {/* section header */}
                <div className='text-center mb-6'>
                    <h1 className='text-4xl font-bold text-white'>Discover Our Menu</h1>
                </div>
                {/* categroiy buttons */}
                <div className='text-center mb-8'>
                    <h2 className='text-2xl mb-4 font-medium text-white'>Explore Our Categories</h2>
                    <ul className='flex justify-center flex-wrap gap-4'>
                        {categoryItem.map((item, index) => (
                            <li key={index} onClick={() => { setcategory((prev) => prev === item.category_title ? "All" : item.category_title) }}
                                className={`cursor-pointer rounded-full text-sm px-6 py-2 font-medium transition-all duration-200 ${category === item.category_title ? "bg-orange-500 text-white" : "bg-white hover:bg-orange-200"} `}>{item.category_title}</li>
                        ))}
                    </ul>
                </div>
                {/* menu */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                    {product.length > 0 ? (
                        product.filter((product) => category === "All" || category === product.category).map((product) => (
                            <NavLink to={`/menu/${product._id}`} key={product._id} className='flex hover:scale-105 transition ease-in-out items-center gap-6 p-4 bg-white rounded-xl shadow-sm'>
                                <img src={product.image} alt="" className='h-30 w-30 rounded-full object-cover' />
                                <div className='flex-1 '>
                                    <div className='flex justify-between items-center'>
                                        <h3 className='sm:text-lg text-base font-semibold text-orange-600'>{product.name}</h3>
                                        
                                    </div>
                                    <p className=' text-sm mt-1'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                                    <div className='flex mt-2 justify-between w-full'>
                                        <span className='text-lg font-bold text-black'>
                                            ₹{product.price}
                                        </span>
                                        <button onClick={(e) => { addtocart(e, product._id) }} className='border-gray-600 border cursor-pointer font-semibold  px-3 rounded-sm text-sm py-0.5'>Add to cart</button>
                                    </div>
                                </div>
                            </NavLink>
                        ))) : (
                        <p className='text-center col-span-2 text-gray-500'>No Menu Available</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Menudisplay