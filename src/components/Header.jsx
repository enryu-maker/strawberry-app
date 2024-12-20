import React from 'react'
import { RxCross1 } from 'react-icons/rx'
import { useNavigate } from 'react-router-dom'
import { image } from '../assets/image'

export default function Header() {
    const navigate = useNavigate()
    return (
        <div className="h-[70px] px-5 flex justify-between items-center bg-white w-full shadow-md">
            <p className=" text-2xl flex font-medium items-center space-x-2 font-SUSE">
                <img src={image.logo} className='w-18 h-20 object-cover' />
                strawberry
            </p>
            <button
                onClick={() => {
                    navigate(-1)
                }}
            >
                <RxCross1 className="text-primary" />
            </button>
            {/* <a href='/'>
                <img src={image.close} alt='close' className='h-[25px] w-[25px] ' />
            </a> */}
        </div>
    )
}
