import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { categoryItem, product } from '../assets/assets'
import axios from "axios";
import { toast } from "react-toastify";



export const reserveContext = createContext()

const ReserveContextProvider = (props) => {
    const [token, setToken] = useState("")
    const navigate = useNavigate()
    const backendurl = import.meta.env.VITE_BACKEND_URL
    const [cartItems, setcartItems] = useState({})


    useEffect(() => {
        if (!token && localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"))
            getCartData(localStorage.getItem("token"))
        }
    }, [])

    const addtocart = async (e,id) => {
        e.preventDefault()
        console.log("function calling")
        const cartdata = structuredClone(cartItems)

        if (cartdata[id]) {
            cartdata[id] = cartdata[id] + 1
        } else {
            cartdata[id] = 1
        }
        setcartItems(cartdata)
        try {
            const res = await axios.post(backendurl + "/api/cart/add", { id }, { headers: { token } })
            if (res.data.success) {
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getcartcount=()=>{
        let totalcount=0;
        for(const item in cartItems){
            try{
                if(cartItems[item]>0){
                    totalcount+=cartItems[item]
                }
            }catch(error){
                console.log(error.message)
            }
        }
        return totalcount
    }

    const getCartTotal=()=>{
        let carttotal=0
        for( let items in cartItems){
            let item=product.find((productitem)=>productitem._id===items)
            carttotal+=item.price * cartItems[items]
        }
        return carttotal
    }

    const getCartData = async (token) => {
        try {
            const res = await axios.post(backendurl + "/api/cart/get", {}, { headers: { token } })
            if (res.data.success) {
                setcartItems(res.data.cartItems)
            }
            else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    const updateCart = async (id, quantity) => {
        let cartdata = structuredClone(cartItems)
        cartdata[id] = quantity
        setcartItems(cartdata)

        if (token) {
            try {
                const res = await axios.post(backendurl + "/api/cart/update", { id, quantity }, { headers: { token } })
                if (res.data.success) {
                    toast.success(res.data.message)
                }
            } catch (error) {
                console.log(error.message)
            }
        }

    }

    const value = {
        token, backendurl, setToken, navigate, getCartTotal, categoryItem,setcartItems , product, getcartcount, addtocart, cartItems, getCartData, updateCart
    }
    return (
        <reserveContext.Provider value={value}>
            {props.children}
        </reserveContext.Provider>
    )
}

export default ReserveContextProvider;