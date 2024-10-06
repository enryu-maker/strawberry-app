import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

export default function ProductInfo() {
    const { state } = useLocation()
    const [qty, setQty] = React.useState(1)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (
        <div className="bg-primary w-full h-[100vh] font-SUSE">
            <div className="flex justify-between top-0 sticky z-50 px-5 py-5 h-[10vh] items-center w-full">
                <button
                    className="h-[35px] w-[35px] flex justify-center items-center bg-white rounded-full"
                    onClick={() => {
                        navigate(-1)
                    }}
                >
                    <IoIosArrowBack className="text-primary text-xl" />
                </button>
            </div>
            <div className="flex justify-start flex-col items-center space-y-5 h-[85vh] ">
                <img
                    alt="alt"
                    src={state?.image}
                    className="h-[150px] w-[150px] rounded-full object-cover "
                />
                <div className="w-[88%] flex flex-col items-start space-y-3 justify-center">
                    <div className="w-full flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-white">
                            {state.name}
                        </h1>
                        <h1 className="text-3xl font-bold text-white">
                            € {state.price}
                        </h1>
                    </div>

                    <p className="text-lg text-white">{state.description}</p>
                    <h1 className="text-3xl font-bold text-white">Quantity</h1>
                    <div className="flex space-x-4">
                        <button
                            className="bg-white flex justify-center font-bold items-center rounded-full h-[35px] w-[35px]"
                            onClick={() => {
                                if (qty > 1) {
                                    setQty(qty - 1)
                                }
                            }}
                        >
                            -
                        </button>

                        <input
                            className="bg-white outline-none rounded-full font-bold h-[35px] w-[50px] text-center"
                            type="number"
                            value={qty}
                            onChange={(e) => {
                                setQty(e.target.value)
                            }}
                        />
                        <button
                            className="bg-white flex justify-center font-bold items-center rounded-full h-[35px] w-[35px]"
                            onClick={() => {
                                setQty(qty + 1)
                            }}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
            <div className="h-[80px] sticky bottom-0 z-50 bg-white">
                <button
                    onClick={() => {
                        dispatch({
                            type: 'ADD_TO_CART',
                            payload: {
                                ...state,
                                qty: qty
                            }
                        })
                    }}
                    className=" w-full h-[80px] text-primary text-2xl"
                >
                    Add to cart (€ {qty * state?.price})
                </button>
            </div>
        </div>
    )
}
