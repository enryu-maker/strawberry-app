import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Menu from './pages/home/Menu'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

export default function App() {
    return (
        <Routes>
            <Route path="/restaurants/:rid/:tid" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    )
}
