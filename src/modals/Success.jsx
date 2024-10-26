import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { image } from '../assets/image'

export default function Success() {
    const { state } = useLocation()
    const tid = useSelector((state) => state.Reducers.table_id)
    const rid = useSelector((state) => state.Reducers.restaurant_id)

    return (
        <div className="w-screen h-screen flex justify-center flex-col space-y-4 items-center font-SUSE">
            <img src={image?.success} className="h-[200px] w-[200px]" alt="" />
            <h1 className=" text-3xl font-bold">Order Sucessfull</h1>
            <h1 className=" text-2xl font-Sevillana">
                Thank you so much for order
            </h1>
            <h1 className=" text-xl font-bold">
                OrderID : {state?.order_item_id}
            </h1>
            <button className="w-[88%] bg-primary py-3 text-white font-bold text-lg rounded-full">
                <Link to={`/restaurants/${rid}/${tid}`}>Back to Home</Link>
            </button>
        </div>
    )
}
