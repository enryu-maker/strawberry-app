import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRef } from 'react'
import { RxCross1 } from 'react-icons/rx'
import {
    AiFillFacebook,
    AiFillInstagram,
    AiFillTwitterCircle,
    AiOutlineMail
} from 'react-icons/ai'
import { TbWorldWww } from 'react-icons/tb'
import { FaChevronRight } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
export default function SideNav({ isOpen, setIsopen }) {
    const ref = useRef(null)
    const data = useSelector((state) => state.Reducers.restaurant_data)

    return (
        <AnimatePresence>
            {isOpen ? (
                <motion.div
                    ref={ref}
                    key="sidebar"
                    className="top-0 bottom-0 left-0 h-screen w-[280px] p-4 bg-white absolute z-50"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{
                        x: -100,
                        opacity: 0.7,
                        transition: { ease: 'easeInOut', duration: 0.5 }
                    }}
                    transition={{
                        ease: 'easeInOut',
                        duration: 0.5
                    }}
                >
                    <div className="h-full w-full z-50 flex flex-col justify-between items-center">
                        <div className="h-[45vh] w-[100%] flex flex-col justify-between items-center">
                            <div className="flex w-full  justify-between items-center">
                                <button
                                    onClick={() => setIsopen(false)}
                                    className="h-[35px] w-[35px] flex justify-center items-center bg-white rounded-full"
                                >
                                    <RxCross1 className="text-primary text-xl" />
                                </button>
                            </div>

                            <div className="flex flex-col justify-center items-center space-y-2">
                                <img
                                    src={data?.image}
                                    alt="icon"
                                    className="h-[100px] w-[100px] rounded-full relative  object-contain shadow-md self-center"
                                />
                                <p className="text-base self-center uppercase text-black font-SUSE font-semibold">
                                    {data?.name}
                                </p>
                                <div className="flex  space-x-3">
                                    <AiFillFacebook size={25} />
                                    <AiFillInstagram size={25} />
                                    <AiFillTwitterCircle size={25} />
                                </div>
                            </div>
                            <div className="w-full space-y-3">
                                <div className="flex justify-between items-center w-full">
                                    <div className="flex space-x-4 items-center">
                                        <TbWorldWww size={20} />
                                        <p className="text-sm self-center uppercase text-black font-SUSE">
                                            Visit our website
                                        </p>
                                    </div>
                                    <FaChevronRight />
                                </div>
                                <div className="flex justify-between items-center w-full">
                                    <div className="flex space-x-4 items-center">
                                        <AiOutlineMail size={30} />
                                        <p className="text-sm self-center uppercase text-black font-SUSE">
                                            receive the latest news from{' '}
                                            {data?.name}
                                        </p>
                                    </div>
                                    <FaChevronRight />
                                </div>
                            </div>
                        </div>
                        <h1 className=" font-SUSE text-xl py-3 pb-[80px] text-black text-center">
                            🍓 strawberryclub&#8482;
                        </h1>
                    </div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    )
}
