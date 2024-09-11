import React from 'react'
import { useDispatch } from 'react-redux'
import { updateQty } from '../store/actions/cartActions'

export default function CartCard({ item }) {
    const [count, setCount] = React.useState(item?.qty)
    const dispatch = useDispatch()
    return (
        <div className="h-[100px] w-[92%] flex justify-between ">
            <div className="w-[60%] flex space-x-3 ">
                <img
                    alt="alt"
                    src={item?.image}
                    className="h-[80px] rounded-xl w-[80px] "
                />
                <div className="w-[60%]">
                    <h2 className=" font-semibold text-base flex items-center text-black">
                        {item?.name}
                    </h2>
                    <p className="text-md font-bold text-gray-500">
                        € {item?.price * count}
                    </p>
                </div>
            </div>
            <div className="w-[40%] flex justify-center items-start space-x-3 ">
                <button
                    onClick={() => {
                        if (count > 1) {
                            setCount(count - 1)
                            dispatch(updateQty(item?.id, count - 1))
                        } else {
                            dispatch({
                                type: 'DELETE_ITEM',
                                payload: item?.id
                            })
                        }
                    }}
                    className="h-[25px] w-[25px] bg-gray-300 font-bold rounded-full flex justify-center items-center"
                >
                    -
                </button>
                <p className="text-md font-bold text-gray-800">{count}</p>
                <button
                    onClick={() => {
                        setCount(count + 1)
                        dispatch(updateQty(item?.id, count + 1))
                    }}
                    className="h-[25px] w-[25px] bg-primary font-bold text-white rounded-full flex justify-center items-center"
                >
                    +
                </button>
            </div>
        </div>
    )
}
