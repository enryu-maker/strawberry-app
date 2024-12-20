import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Menu from './pages/home/Menu'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ProductInfo from './pages/home/ProductInfo'
import Order from './pages/home/Order'
import Payment from './pages/home/Payment'
import PayBill from './pages/payment/PayBill'
import Success from './modals/Success'
import PaymentMethod from './pages/payment/PaymentMethod'
import Tip from './pages/payment/Tip'
import Done from './pages/payment/Done'
import Feedback from './pages/payment/Feedback'
import EmptyCart from './pages/home/EmptyCart'

export default function App() {
    return (
        <Routes>
            <Route path="/restaurants/:rid/:tid" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/menu/product-info" element={<ProductInfo />} />
            <Route path="/order-details" element={<Order />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/success" element={<Success />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/items-bill" element={<PayBill />} />
            <Route path="/payment-method" element={<PaymentMethod />} />
            <Route path="/tip" element={<Tip />} />
            <Route path="/payment-done" element={<Done />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/empty-cart" element={<EmptyCart />} />
        </Routes>
    )
}
