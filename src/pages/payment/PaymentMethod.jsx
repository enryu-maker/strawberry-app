import React, { useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { Popover } from 'react-tiny-popover'
import { CiCircleInfo } from 'react-icons/ci'
import { useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
// import Feedback from './modals/Feedback'
import { useDispatch } from 'react-redux'
import { createPayment } from '../../store/actions/sessionAction'
import CustomButton from '../../components/CustomButton'
import { image } from '../../assets/image'


function PaymentMethod() {
    const { state } = useLocation()
    const data = [
        {
            name: 'Mastercard',
            ending: '1234',
            expires: '4/26',
            image: image.mastercard
        },
        {
            name: 'Visa',
            ending: '4568',
            expires: '9/11',
            image: image.visa
        },
        {
            name: 'Apple Pay',
            ending: '6969',
            expires: '9/11',
            image: image.apay
        }
    ]
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [selectedPayment, setSelectedPayment] = useState('')
    const [showfeedback, setshowfeedback] = useState(false)
    const [loading, setLoading] = useState(false)

    const [popoverState, setPopoverState] = useState({
        isOpen: false,
        target: null,
        content: ''
    })
    const handlepaymentclick = () => {
        navigate(
            '/tip', {
            state: state
        }
        )
        // dispatch(createPayment(
        //     state?.session_id,
        //     state?.user_id,
        //     state?.method,
        //     state?.amount + state?.amount * 0.01,
        //     setLoading,
        //     navigate
        // ))
    }
    const handleInfoClick = (event, content) => {
        setPopoverState({
            isOpen: !popoverState.isOpen,
            target: event.currentTarget,
            content: content
        })
    }

    const closePopover = () => {
        setPopoverState({
            isOpen: false,
            target: null,
            content: ''
        })
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ ease: 'easeInOut', duration: 0.5 }}
                className="w-screen h-full"
            >
                <div className="flex flex-col p-4 gap-2 w-full h-screen">
                    <div className="flex space-x-4 w-full justify-start items-start h-fit">
                        <div className="w-fit h-fit fixed left-0">
                            <IoIosArrowBack
                                className="text-2xl"
                                onClick={() => navigate(-1)}
                            />
                        </div>
                        <div className="flex flex-col w-full h-full pt-1 gap-2 justify-center align-middle text-center">
                            <div>
                                <hr className="p-[2px] rounded-lg bg-black"></hr>
                            </div>
                            <div className="flex justify-center items-center gap-2">
                                <p className="text-sm font-base">
                                    Pay <span></span>
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 w-full pt-1 justify-center align-middle text-center">
                            <div>
                                <hr className="p-[2px] rounded-lg bg-black opacity-50"></hr>
                            </div>
                            <div>
                                <p className="text-sm font-base">
                                    Tip <span></span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 pt-4 h-fit w-full">
                        {data.map((data, index) => (
                            <label
                                key={index}
                                className={`flex border-[1px] gap-4 rounded-xl p-2 px-4 py-3 cursor-pointer ${selectedPayment === data.name
                                    ? 'border-blue-500'
                                    : ''
                                    }`}
                            >
                                <input
                                    id={index}
                                    type="radio"
                                    name={index}
                                    value={data.name}
                                    className="hidden"
                                    checked={selectedPayment === data.name}
                                    onChange={() =>
                                        setSelectedPayment(data.name)
                                    }
                                />
                                <div className="w-[50px] h-[50px] flex items-center justify-center">
                                    <img
                                        src={data.image}
                                        className="w-[50px] h-[50px] object-contain"
                                        alt={data.name}
                                    />
                                </div>
                                <div className="flex flex-col justify-center items-start">
                                    <p className="font-semibold">
                                        {data.name}&nbsp;ending in&nbsp;
                                        {data.ending}{' '}
                                    </p>
                                    <p className="font-light text-gray-500">
                                        Expires: {data.expires}
                                    </p>
                                </div>
                            </label>
                        ))}
                    </div>
                    <div className="flex h-fit w-full flex-col p-3">
                        <div className="flex w-full h-full justify-between text-gray-500">
                            <div className="space-y-2 w-full flex flex-col justify-start">
                                <p>Subtotal</p>
                                <p className="flex items-center gap-2">
                                    <Popover
                                        isOpen={
                                            popoverState.isOpen &&
                                            popoverState.content ===
                                            'Digital Fee'
                                        }
                                        positions={['top', 'bottom']}
                                        padding={10}
                                        onClickOutside={closePopover}
                                        content={
                                            <div className="p-2 bg-gray-100 shadow-lg rounded ml-32 -mb-5 flex flex-col text-gray-400 text-sm">
                                                <p>GST: 18%</p>
                                                <p>SGST: 9%</p>
                                                <p>CGST: 9%</p>
                                            </div>
                                        }
                                        target={popoverState.target}
                                    >
                                        <span className="flex items-center gap-2">
                                            Digital Fee
                                            <CiCircleInfo
                                                className="text-xl cursor-pointer"
                                                onClick={(e) =>
                                                    handleInfoClick(
                                                        e,
                                                        'Digital Fee'
                                                    )
                                                }
                                            />
                                        </span>
                                    </Popover>
                                </p>
                                <p className="text-black font-medium">Total</p>
                            </div>
                            <div className="space-y-2 w-full flex flex-col justify-end items-end text-black font-medium">
                                <p>€ {state?.amount}</p>
                                {/* <p>€ {state?.tip}</p> */}
                                <p>€ {state?.amount * 0.01}</p>
                                <p>€ {state?.amount + state?.amount * 0.01}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-full flex-col items-start justify-start text-center">
                        <CustomButton
                            text={`Make a Payment`}
                            onClick={() => handlepaymentclick()}
                        />
                        <div className="flex flex-col items-center gap-5 justify-center pb-10">
                            <p className="flex space-x-2">
                                <span>Pay secure with</span>
                                <img src={image.logo} className="w-6 h-6" />
                                <span className="font-semibold">
                                    Strawberry
                                </span>
                            </p>
                            <p>
                                by reating an account,you aggree to our term and
                                accept the processing data in accordanc with
                                sunday’s
                                <span className="text-primary">
                                    {' '}
                                    privicy policy.
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                {/* {showfeedback ? (
                    <Feedback
                        isOpen={showfeedback}
                        setIsopen={setshowfeedback}
                        payment={selectedPayment}
                        data={state}
                    />
                ) : null} */}
            </motion.div>
        </AnimatePresence>
    )
}

export default PaymentMethod
