import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence, color } from 'framer-motion'
import { image } from '../../../assets/image'
import { useRef } from 'react'
import CustomButton from '../../../components/CustomButton'
import { CustomButton2 } from '../../../components/CustomButton'
import { useNavigate } from 'react-router-dom'
export default function BottomOptions({ isOpen, setIsopen }) {
    const ref = useRef(null)
    const navi = useNavigate()
    const [billMethod, setBillMethod] = useState('')
    const handleSplit = () => {
        setBillMethod('split')
    }
    return (
        <AnimatePresence mode="wait">
            {isOpen ? (
                <>
                    <motion.div
                        ref={ref}
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
                        <div className="h-full w-full flex flex-col justify-center items-center gap-2 ">
                            <div className="w-full h-full">
                                <CustomButton
                                    text={'Pay Full Bill'}
                                    style={'scale-90 -mb-0'}
                                    onClick={() => navi('/tip')}
                                />
                            </div>
                            <div className="w-full h-full">
                                <CustomButton2
                                    text={'Split Bill'}
                                    style={
                                        'scale-90 -mb-0 bg-transparent border-2 border-primary'
                                    }
                                    onClick={() => handleSplit()}
                                />
                            </div>
                        </div>
                    </motion.div>

                    {billMethod === 'split' && (
                        <motion.div
                            ref={ref}
                            key="sidebar"
                            className="bottom-0 min-h-[250px] max-h-[300px] w-screen mb-0 p-4 bg-gray-100 
          rounded-t-3xl fixed z-50"
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{
                                y: 100,
                                opacity: 0.5
                            }}
                            transition={{
                                ease: 'easeOut',
                                duration: 0.3
                            }}
                        >
                            <div className="flex justify-between w-full p-4">
                                <p className="font-medium text-xl">
                                    Pay Your Bill
                                </p>
                                <button
                                    onClick={() => {
                                        setBillMethod('')
                                        setIsopen(false)
                                    }}
                                    className=""
                                >
                                    <img
                                        src={image.close}
                                        alt="close"
                                        className="h-[20px] w-[20px]"
                                    />
                                </button>
                            </div>
                            <div className="h-full w-full flex flex-col justify-center items-center gap-2 ">
                                <div className="w-full h-full">
                                    <CustomButton
                                        text={'Equal Split'}
                                        style={'scale-90 -mb-0'}
                                        onClick={() => navi('/tip')}
                                    />
                                </div>
                                <div className="w-full h-full">
                                    <CustomButton2
                                        text={'Item Wise Split'}
                                        style={
                                            'scale-90 -mb-0 bg-transparent border-2 border-primary'
                                        }
                                    />
                                </div>
                                <div className="w-full h-fit">
                                    <CustomButton2
                                        text={'Custom Amount Split'}
                                        style={
                                            'scale-90 -mb-0 bg-transparent border-2 border-primary'
                                        }
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </>
            ) : null}
        </AnimatePresence>
    )
}
