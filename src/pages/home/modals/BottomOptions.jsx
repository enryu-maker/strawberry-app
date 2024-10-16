import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { image } from '../../../assets/image'
import CustomButton from '../../../components/CustomButton'
import { CustomButton2 } from '../../../components/CustomButton'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createPayment } from '../../../store/actions/sessionAction'

export default function BottomOptions({ isOpen, setIsopen, paymentMethods }) {
    const navi = useNavigate();
    const dispatch = useDispatch();
    const [billMethod, setBillMethod] = useState(''); // Track which option is selected
    const [loading, setLoading] = useState(false); // State to handle loading

    const session_id = useSelector(state => state.Reducers.session_id);
    const table_id = useSelector(state => state.Reducers.table_id);
    const user_id = useSelector(state => state.Reducers.user_id);

    // Extract full method and split methods
    const { full, ...splitMethods } = paymentMethods;

    // Check if Full payment is locked
    const isFullLocked = full.locked;

    // Filter split methods where locked is false
    const availableSplitOptions = Object.values(splitMethods).filter(method => !method.locked);

    // Check if all split options are locked
    const allSplitOptionsLocked = availableSplitOptions.length === 0;

    return (
        <AnimatePresence mode="wait">
            {isOpen ? (
                <>
                    {/* Main Bottom Options Panel */}
                    <motion.div
                        key="sidebar"
                        className="bottom-0 min-h-[250px] max-h-[300px] w-screen mb-0 p-4 bg-gray-100 
                        rounded-t-3xl fixed z-50"
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{
                            y: 100,
                            opacity: 0.3
                        }}
                        transition={{
                            ease: 'easeOut',
                            duration: 0.3
                        }}
                    >
                        <div className="flex justify-between w-full p-4">
                            <p className="font-medium text-xl">Pay Your Bill</p>
                            <button
                                onClick={() => setIsopen(false)}
                                className=""
                            >
                                <img
                                    src={image.close}
                                    alt="close"
                                    className="h-[20px] w-[20px]"
                                />
                            </button>
                        </div>

                        <div className="h-full w-full flex flex-col justify-center items-center gap-2">
                            {!billMethod && (
                                <>
                                    {/* FULL Payment Option */}
                                    {!isFullLocked && (
                                        <div className="w-full h-full">
                                            <CustomButton
                                                text="Full Payment"
                                                style={'scale-90 -mb-0'}
                                                onClick={() => navi('/tip', {
                                                    state: {
                                                        method: paymentMethods["full"].type,
                                                        amount: paymentMethods["full"].amount,
                                                        session_id: session_id,
                                                        user_id: user_id,
                                                    }
                                                })}
                                            />
                                        </div>
                                    )}

                                    {/* SPLIT Option */}
                                    {availableSplitOptions.length > 0 && (
                                        <div className="w-full h-full">
                                            <CustomButton2
                                                text="Split Bill"
                                                style={'scale-90 -mb-0 bg-transparent border-2 border-primary'}
                                                onClick={() => setBillMethod('split')} // Show split options on click
                                            />
                                        </div>
                                    )}
                                </>
                            )}

                            {/* SPLIT Options Section */}
                            {billMethod === 'split' && (
                                <>
                                    <div className="w-full h-full">
                                        {availableSplitOptions.length > 0 ? (
                                            availableSplitOptions.map((method) => (
                                                <div key={method?.type} className="w-full h-full">
                                                    <CustomButton2
                                                        text={method?.name}
                                                        style={'scale-90 -mb-0 bg-transparent border-2 border-primary'}
                                                        onClick={() => {
                                                            navi('/tip', {
                                                                state: {
                                                                    method: method.type,
                                                                    amount: method.amount,
                                                                    session_id: session_id,
                                                                    user_id: user_id,
                                                                }
                                                            })
                                                        }}
                                                    />
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-center text-gray-500">No Split Options Available</p>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>
                </>
            ) : null}
        </AnimatePresence>
    )
}

