import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { addcustom, addnotes } from '../../store/actions/cartActions';
import { getCustum } from '../../store/actions/sessionAction';
import { toast } from 'react-toastify';

export default function ProductInfo() {
    const { state } = useLocation();
    const [qty, setQty] = React.useState(1);
    const [count1, setCount1] = React.useState(0)
    const [show, setShow] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [data, setData] = React.useState([])
    const [notes, setNotes] = React.useState("")
    console.log(state)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getCustum(state?.id, setLoading, setData))
    }, [dispatch, state?.id])

    return (
        <>
            {show ? (
                <div class="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-SUSE">
                    <div class="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
                        <div class="flex items-center pb-3 border-b border-gray-300">
                            <h3 class="text-gray-800 text-xl font-bold flex-1">
                                Customize {state?.name}
                            </h3>
                            <svg
                                onClick={() => {
                                    setShow(!show)
                                }}
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-3 ml-2 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500"
                                viewBox="0 0 320.591 320.591"
                            >
                                <path
                                    d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                                    data-original="#000000"
                                ></path>
                                <path
                                    d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                                    data-original="#000000"
                                ></path>
                            </svg>
                        </div>

                        <div class="my-6">
                            <p class="text-gray-600 text-sm font-semibold  leading-relaxed mt-2">
                                Customize Item
                            </p>
                            <div class="flex flex-wrap justify-between items-center">
                                {
                                    data.map((custom, index) => (
                                        <div key={index} class="w-full md:w-1/2 ">
                                            <div class="flex items-center justify-between py-2 border-b border-gray-300">
                                                <p class="text-gray-800 text-sm font-bold  leading-relaxed">
                                                    {custom?.name}
                                                </p>

                                                <div className="w-[40%] flex justify-center items-start space-x-3 ">
                                                    <p class="text-gray-600 text-sm font-semibold  leading-relaxed">
                                                        € {custom?.price}
                                                    </p>
                                                    <button
                                                        onClick={() => {
                                                            if (count1 > 0) {
                                                                setCount1(count1 - 1)
                                                                dispatch(addcustom(state?.id, custom?.id, count1 - 1))
                                                            } else {
                                                                dispatch({
                                                                    type: 'DELETE_CUSTOM',
                                                                    payload: custom?.id
                                                                })
                                                            }
                                                        }}
                                                        className="h-[25px] w-[25px] bg-gray-300 font-bold rounded-full flex justify-center items-center"
                                                    >
                                                        -
                                                    </button>
                                                    <p className="text-md font-bold text-gray-800">{count1}</p>
                                                    <button
                                                        onClick={() => {
                                                            setCount1(count1 + 1)
                                                            dispatch(addcustom(state?.id, custom?.id, count1 + 1))
                                                        }}
                                                        className="h-[25px] w-[25px] bg-primary font-bold text-white rounded-full flex justify-center items-center"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <p class="text-gray-600 text-sm font-semibold  leading-relaxed mt-2">
                                Notes
                            </p>
                            <textarea
                                type="text"
                                onChange={(e) => {
                                    setNotes(e.target.value)
                                }}
                                multiple
                                className="h-[80px] border-[1px] text-start p-2 w-full outline-none rounded-md border-primary"
                            />
                        </div>

                        <div class="border-t border-gray-300 pt-6 flex justify-end gap-4">
                            <button
                                onClick={() => {
                                    setShow(!show)
                                }}
                                type="button"
                                class="px-4 py-2 rounded-lg text-gray-800 text-sm border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => {
                                    dispatch(addnotes(state?.id, notes))
                                    setShow(!show)
                                    toast.success('Product Added to cart.', {
                                        position: 'top-center',
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        theme: 'light'
                                    })
                                }}
                                type="button"
                                class="px-4 py-2 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-primary"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
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
                            <button
                                onClick={() => {
                                    setShow(true)
                                    dispatch({
                                        type: 'ADD_TO_CART',
                                        payload: {
                                            ...state,
                                            qty: qty,
                                        },
                                    })
                                }}
                                className="bg-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition">
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
                        onClick={() => {
                            dispatch({
                                type: 'ADD_TO_CART',
                                payload: {
                                    ...state,
                                    qty: qty,
                                },
                            })
                            toast.success('Product Added to cart.', {
                                position: 'top-center',
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                theme: 'light'
                            })
                        }}
                        className="w-full h-full text-red-500 text-2xl font-bold hover:bg-red-100 transition"
                    >
                        Add to cart (€ {qty * state?.price})
                    </button>
                </div>
            </div>
        </>

    );
}
