import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaUtensils, FaArrowLeft } from 'react-icons/fa'

export default function EmptyCart() {
    const location = useLocation()

    // Extract restaurant_id and restaurant_name from query params
    const queryParams = new URLSearchParams(location.search)
    const restaurant_id = queryParams.get('restaurant_id')
    const restaurant_name = queryParams.get('restaurant_name')
    const navigate = useNavigate()
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-100 font-SUSE">
            <div className="flex flex-col items-center space-y-4">
                {/* Restaurant-specific Icon */}
                <FaUtensils className="text-gray-400 text-6xl" />

                {/* Main Message */}
                <h1 className="text-3xl font-bold text-gray-700">Your Cart is Empty</h1>

                {/* Restaurant-specific Message */}
                {restaurant_name && (
                    <p className="text-lg text-center text-gray-500">
                        You haven't added any items from <span className="font-bold">{restaurant_name}</span> yet!
                    </p>
                )}

                {/* Subtext */}
                <p className="text-md text-gray-500">Start adding some delicious meals to your order.</p>
            </div>

            {/* Button to navigate back to the restaurant's menu */}
            <button
                onClick={() => {
                    navigate(
                        `/menu/?restaurant_id=${restaurant_id
                        }&restaurant_name=${restaurant_name}`
                    )
                }}
                className="bg-primary text-white px-6 py-3 mt-4 rounded-full shadow-lg flex items-center space-x-2 transition-transform transform hover:scale-105">
                <span>See menu for {restaurant_name ? restaurant_name : 'Menu'}</span>
            </button>
        </div>
    )
}