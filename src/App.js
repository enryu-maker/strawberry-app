import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Menu from './pages/home/Menu'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ProductInfo from './pages/home/ProductInfo'
import Order from './pages/home/Order'
import Payment from './pages/home/Payment'
import Tip from './pages/home/Tip'
import Success from './pages/home/modals/Success'
import PaymentMethod from './pages/home/PaymentMethod'
import ItemBill from './pages/payment/ItemBill'
import Feedback from './pages/home/Feedback'
import PaymentDone from './pages/home/modals/PayementDone'
import EmptyCart from './pages/home/EmptyCart'

export default function App() {
    return (
        <Routes>
            <Route path="/restaurants/:rid/:tid" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/menu/product-info" element={<ProductInfo />} />
            <Route path="/order-details" element={<Order />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/payment-method" element={<PaymentMethod />} />
            <Route path="/items-bill" element={<ItemBill />} />
            <Route path="/tip" element={<Tip />} />
            <Route path="/success" element={<Success />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/payment-done" element={<PaymentDone />} />
            <Route path="/empty-cart" element={<EmptyCart />} />
        </Routes>
    )
}
