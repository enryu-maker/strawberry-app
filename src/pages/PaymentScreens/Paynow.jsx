import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
export default function Paynow() {
    const navigate = useNavigate()
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
                    Pay Now
                </h1>
            </div>
        </div>
    )
}
