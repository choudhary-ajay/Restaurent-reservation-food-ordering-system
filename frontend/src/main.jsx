import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ReserveContextProvider from './context/reserveContext.jsx'


createRoot(document.getElementById('root')).render(

    <BrowserRouter>
    <ReserveContextProvider>
    <App />
    </ReserveContextProvider>
    </BrowserRouter>
   

)
