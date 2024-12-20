import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function MenuCard({ item }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (
        <div className="flex justify-between w-full font-SUSE">
            <div
                onClick={() => {
                    navigate(`product-info/?item_name=${item?.name}`, {
                        state: item
                    })
                }}
                className="w-[60%] flex flex-col items-start justify-center"
            >
                <h2 className=" font-bold text-lg flex items-center text-black">
                    {item?.name}
                </h2>
                <p className="text-gray-500 text-sm text-start">
                    {item?.description.length > 60 ? `${item.description.slice(0, 60)}...` : item.description}
                </p>
                <h2 className=" font-bold text-lg text-primary">
                    {item?.currency} {item?.price}
                </h2>
            </div>
            <img
                alt="alt"
                src={item?.image}
                className="w-[30%] h-[100px] object-cover rounded-lg mb-2"
            />
            <button
                onClick={() => {
                    dispatch({
                        type: 'ADD_TO_CART',
                        payload: {
                            ...item,
                            qty: 1,
                            customizations: {},
                            notes: ""
                        }
                    })
                }}
                className="h-[25px] w-[25px] font- text-lg font-bold absolute right-4 m-1 rounded-full flex justify-center items-center text-white bg-black"
            >
                +
            </button>
        </div>
    )
}