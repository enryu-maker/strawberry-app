import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Lottie from 'lottie-react'
import { animation } from '../assets/animation'
import { CustomButton2 } from '../components/CustomButton'
export default function Success() {
    const { state } = useLocation()
    const tid = useSelector((state) => state.Reducers.table_id)
    const rid = useSelector((state) => state.Reducers.restaurant_id)
    const navigate = useNavigate()

    return (
        <div className="w-screen h-screen flex justify-center flex-col space-y-4 items-center font-SUSE">
            <Lottie
                animationData={animation.order}
                loop={true}
                className="w-[250px] h-[250px] mb-5"
            />
            <h1 className=" text-3xl font-bold">Order Sucessfull</h1>
            <h1 className=" text-2xl font-SUSE">
                Thank you so much for order
            </h1>
            <h1 className=" text-xl font-bold">
                OrderID : {state?.order_item_id}
            </h1>
            <CustomButton2
                text="Back to Home"
                style={'scale-90 w-full -mb-0 bg-transparent border-2 border-primary'}
                onClick={() => {
                    navigate(`/restaurants/${rid}/${tid}`);
                }}
            />
        </div>
    )
}
