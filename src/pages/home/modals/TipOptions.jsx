import React, { useEffect } from 'react'
import { motion, AnimatePresence, color } from 'framer-motion'
import { image } from '../../../assets/image'
import { useRef } from 'react'
import CustomButton from '../../../components/CustomButton'
import { useNavigate } from 'react-router-dom'
import { createPayment } from '../../../store/actions/sessionAction'
import { useDispatch } from 'react-redux'
export default function TipOptions({ isOpen, setIsopen, tip, total, data }) {
    const ref = useRef(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(false)
    const handlenavigate = () => {
        if (tip != '') {
            data['tip'] = tip
            dispatch(createPayment(
                data?.session_id,
                data?.user_id,
                data?.method,
                data?.amount + tip + data?.amount * 0.01,
                setLoading,
                navigate
            ))
        }
    }
    return (
        <AnimatePresence mode="wait">
            {isOpen ? (
                <motion.div
                    ref={ref}
                    key="sidebar"
                    className="bottom-0 min-h-[250px] max-h-[300px] w-screen mb-0 p-4 bg-gray-100 
          rounded-t-3xl fixed z-50"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{
                        y: 100,
                        opacity: 1,
                        transition: { ease: 'easeInOut', duration: 0.5 }
                    }}
                    transition={{
                        ease: 'easeOut',
                        duration: 0.3
                    }}
                >
                    <div className="flex justify-between w-full p-2">
                        <p className="font-medium text-xl">Amount</p>
                        <button onClick={() => setIsopen(false)} className="">
                            <img
                                src={image.close}
                                alt="close"
                                className="h-[20px] w-[20px]"
                            />
                        </button>
                    </div>
                    <div className="flex flex-col gap-5 justify-between h-full text-center items-center">
                        <div className="w-full h-fit">
                            <p className="text-gray-500">Tip Amount: {tip}$</p>
                            <p className="text-black">Total Amount: {total}$</p>
                        </div>
                        <div className="w-full h-fit">
                            <CustomButton
                                text={'Proceed to pay'}
                                onClick={handlenavigate}

                            />
                        </div>
                    </div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    )
}
