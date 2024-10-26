import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ProductInfo() {
    const { state } = useLocation();
    const [qty, setQty] = React.useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div className="bg-gradient-to-b from-red-500 to-red-600 w-full h-screen font-SUSE">
            <div className="flex justify-between sticky top-0 z-50 px-5 py-3 bg-opacity-80 backdrop-blur-md rounded-lg">
                <button
                    className="h-10 w-10 flex justify-center items-center bg-white rounded-full shadow-lg hover:shadow-xl transition"
                    onClick={() => navigate(-1)}
                >
                    <IoIosArrowBack className="text-red-500 text-xl" />
                </button>
            </div>
            <div className="flex flex-col items-center space-y-5 h-[85vh] overflow-y-auto">
                <img
                    alt="Product"
                    src={state?.image}
                    className="h-40 w-40 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="w-11/12 flex flex-col items-start space-y-3">
                    <h1 className="text-4xl font-bold text-white">{state?.name}</h1>
                    <h1 className="text-3xl font-semibold text-white">€ {state.price}</h1>
                    {state?.is_customizable && (
                        <button className="bg-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition">
                            <h1 className="text-lg font-bold text-red-500">Customize</h1>
                        </button>
                    )}
                    <p className="text-lg text-white">{state.description}</p>
                    <h1 className="text-3xl font-bold text-white">Quantity</h1>
                    <div className="flex items-center space-x-4">
                        <button
                            className="bg-white flex justify-center items-center rounded-full h-10 w-10 shadow hover:shadow-lg transition"
                            onClick={() => qty > 1 && setQty(qty - 1)}
                        >
                            -
                        </button>
                        <input
                            className="bg-white outline-none rounded-full font-bold h-10 w-20 text-center shadow"
                            type="number"
                            value={qty}
                            onChange={(e) => setQty(Math.max(1, e.target.value))}
                        />
                        <button
                            className="bg-white flex justify-center items-center rounded-full h-10 w-10 shadow hover:shadow-lg transition"
                            onClick={() => setQty(qty + 1)}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
            <div className="h-20 sticky bottom-0 z-50 bg-white shadow-lg flex items-center justify-center">
                <button
                    onClick={() => dispatch({
                        type: 'ADD_TO_CART',
                        payload: {
                            ...state,
                            qty: qty,
                        },
                    })}
                    className="w-full h-full text-red-500 text-2xl font-bold hover:bg-red-100 transition"
                >
                    Add to cart (€ {qty * state?.price})
                </button>
            </div>
        </div>
    );
}
