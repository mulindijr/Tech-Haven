import { useState,useEffect} from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Dashboard from "./pages/Dashboard"
import Add from "./pages/Add"
import List from "./pages/List"
import Orders from "./pages/Orders"
import Login from "./components/Login"
import Customers from "./pages/Customers"
import { ToastContainer } from 'react-toastify';

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = 'Ksh'

function App() {

  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      { token === ""
      ? <Login setToken = {setToken}/>
      :
        <>
          <Navbar setToken = {setToken}/>
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[82%] ml-[18%] px-6 my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/" element={<Dashboard token = {token}/>} />
                <Route path="/add" element={<Add token = {token}/>} />
                <Route path="/list" element={<List token = {token}/>} />
                <Route path="/orders" element={<Orders token = {token}/>} />
                <Route path="/customers" element={<Customers token = {token}/>} />
              </Routes>
            </div>
          </div>      
        </>
      }
    </div>
  )
}

export default App
