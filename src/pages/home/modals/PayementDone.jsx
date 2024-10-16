import React, { useState, useEffect } from 'react'
import { image } from '../../../assets/image'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Feedback from './Feedback'
import { FaCrown, FaCoins, FaHome } from "react-icons/fa";
import { endSession } from '../../../store/actions/sessionAction'
export default function PaymentDone() {
    const tid = useSelector((state) => state.Reducers.table_id)
    const rid = useSelector((state) => state.Reducers.restaurant_id)
    const [showfeedback, setshowfeedback] = useState(false)
    const dispatch = useDispatch()



    return (
        <div className="w-screen h-screen flex justify-center flex-col items-center bg-white font-SUSE">
            <div className="flex flex-col items-center space-y-4">
                <img src={image?.success} className="h-[180px] w-[180px] animate-pulse" alt="Payment Success" />
                <h1 className="text-4xl font-bold text-green-600">Payment Successful!</h1>
                <h2 className="text-2xl text-gray-700">Thank you for your payment</h2>
                <h3 className="text-xl font-bold text-indigo-600">Table ID: {tid}</h3>
            </div>

            {/* Royalty points section with icons */}
            <div className="mt-8 bg-white p-4 rounded-lg text-center space-y-2 w-[90%]">
                <div className="flex justify-center items-center space-x-2">
                    <FaCrown className="text-yellow-600 text-3xl" />
                    <h3 className="text-2xl font-semibold text-yellow-600">Congratulations!</h3>
                </div>
                <p className="text-base text-gray-700">You’ve earned <span className="text-indigo-500 font-bold">100 Royalty Points</span>!</p>
                <div className="flex justify-center items-center space-x-2">
                    <FaCoins className="text-yellow-600 text-2xl" />
                    <p className="text-sm text-gray-500">These points can be redeemed on your next visit.</p>
                </div>
            </div>

            <button
                onClick={() => {
                    dispatch(endSession())
                }}
                className="w-[88%] bg-primary py-3 text-white font-bold text-lg rounded-full mt-6 shadow-lg transform hover:scale-105 transition-transform duration-200 flex items-center justify-center space-x-2">
                <FaHome className="text-white text-lg" />
                <Link to={`/restaurants/${rid}/${tid}`}>Back to Home</Link>
            </button>
            <button
                onClick={() => {
                    setshowfeedback(true)
                }}
                className="w-[88%] bg-primary py-3 text-white font-bold text-lg rounded-full mt-6 shadow-lg transform hover:scale-105 transition-transform duration-200 flex items-center justify-center space-x-2">
                Give Feedback
            </button>

            {/* Optional feedback modal */}
            {showfeedback && <Feedback isOpen={showfeedback} setIsopen={setshowfeedback} />}
        </div>
    )
}
