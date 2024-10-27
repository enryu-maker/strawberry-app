import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { image } from '../../assets/image'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { createOrder, startSession } from '../../store/actions/sessionAction'
import { RotatingLines } from 'react-loader-spinner'
export default function Payment() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(true)
    const [loading1, setLoading1] = React.useState(false)
    const [connected, setConnected] = React.useState(false)
    const tid = useSelector((state) => state.Reducers.table_id)
    const cart = useSelector((state) => state.Reducers.cart)
    const session_id = useSelector((state) => state.Reducers.session_id)
    const user_id = useSelector((state) => state.Reducers.user_id)
    function getData() {
        let result = {};

        cart.forEach((item, index) => {
            result[item?.id] = {
                quantity: item.qty,
                customizations: item.customizations || {},
                notes: item.notes || ""
            };
        });
        return JSON.stringify(result) // Return the data as a JSON string
    }


    React.useEffect(() => {
        const setFp = async () => {
            const fp = await FingerprintJS.load()
            const { visitorId } = await fp.get()
            dispatch(startSession(tid, visitorId, setConnected))
            setTimeout(() => {
                setLoading(false)
            }, 1500)
        }
        setFp()
    }, [dispatch, tid])
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
                    Payment
                </h1>
            </div>
            {!loading ? (
                <div className="flex justify-center flex-col space-y-4 items-center">
                    <button
                        onClick={() => {
                            // logGoogleUser()
                        }}
                        className=" border-[1px] w-[92%] self-center  rounded-lg bg-white px-2 py-4 border-black flex justify-center items-center space-x-4"
                    >
                        <img
                            alt="google"
                            className="h-[35px] w-[35px]"
                            src={image.now}
                        />
                        <p className="text-xl text-black font-semibold font-SUSE">
                            Pay As You Order
                        </p>
                    </button>
                    <button
                        onClick={() => {
                            // console.log({
                            //     session_id: session_id,
                            //     session_user_id: user_id,
                            //     items_data: getData()
                            // })
                            dispatch(
                                createOrder(
                                    {
                                        session_id: session_id,
                                        session_user_id: user_id,
                                        items_data: getData()
                                    },
                                    navigate,
                                    setLoading1
                                )
                            )
                        }}
                        className=" border-[1px] w-[92%] self-center  rounded-lg bg-white px-2 py-4 border-black flex justify-center items-center space-x-4"
                    >
                        {loading1 ? (
                            <RotatingLines
                                visible={true}
                                height="30"
                                width="30"
                                strokeColor="#e85050"
                                strokeWidth="5"
                                animationDuration="1"
                                ariaLabel="rotating-lines-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />
                        ) : (
                            <>
                                <img
                                    alt="google"
                                    className="h-[35px] w-[35px]"
                                    src={image.later}
                                />
                                <p className="text-xl text-black font-semibold font-SUSE">
                                    Eat First, Pay Later
                                </p>
                            </>
                        )}
                    </button>
                    <p className=" font-SUSE text-center">
                        By continuing, I agree to User Terms and Privacy Policy
                    </p>
                    <p className=" font-SUSE">
                        secure payments with 🍓 strawberry
                    </p>
                    {connected ? (
                        <div className="flex self-center items-center justify-start space-x-3 ">
                            <div className="h-[12px] w-[12px] rounded-full  bg-green-500"></div>
                            <p className=" text-xs">Session Connected</p>
                        </div>
                    ) : (
                        <div className="flex self-center items-center justify-start space-x-3 ">
                            <div className="h-[12px] w-[12px] rounded-full  bg-red-500"></div>
                            <p className=" text-xs">Session Error</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex justify-center flex-col space-y-4 items-center">
                    <RotatingLines
                        visible={true}
                        height="30"
                        width="30"
                        strokeColor="#e85050"
                        strokeWidth="5"
                        animationDuration="1"
                        ariaLabel="rotating-lines-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                    <p className=" text-xs">Connecting Session </p>
                </div>
            )}
        </div>
    )
}
