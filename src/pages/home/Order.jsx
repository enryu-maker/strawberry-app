import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CartCard from '../../components/CartCard'

export default function Order() {
    const navigate = useNavigate()
    const cart = useSelector((state) => state.Reducers.cart)
    return (
        <div className="bg-white w-full h-[100vh] font-SUSE">
            <div className="flex justify-between top-0 sticky z-50  px-5 py-5 h-[10vh] items-center w-full">
                <button
                    className="h-[35px] w-[35px] flex justify-center items-center bg-primary rounded-full"
                    onClick={() => {
                        navigate(-1)
                    }}
                >
                    <IoIosArrowBack className="text-white text-xl" />
                </button>
                <h1 className="text-3xl font-Facinate text-primary font-bold">
                    Your Order
                </h1>
            </div>
            <div className="flex flex-col items-center space-y-4 h-[80vh]">
                {cart.map((item, index) => (
                    <CartCard key={index} item={item} />
                ))}
            </div>
            <div className="flex sticky bottom-0 font-Facinate text-white text-2xl w-full justify-center z-50 items-center">
                <button
                    onClick={() => {
                        navigate('/payment')
                    }}
                    className="  bg-primary flex justify-center items-center rounded-full w-[88%] h-[55px]"
                >
                    Order
                </button>
            </div>
        </div>
    )
}
