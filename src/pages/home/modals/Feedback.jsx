import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Rating from 'react-rating'
import { IoIosStarOutline } from 'react-icons/io'
import { IoIosStar } from 'react-icons/io'
import { image } from '../../../assets/image'
import { useSelector } from 'react-redux'

export let stars = ''

export default function Feedback({ isOpen, setIsopen, }) {
    const ref = useRef(null)
    const [rating, setRating] = useState(Number) // Initial value
    const [error, setError] = useState(false) // Initial value
    const restaurant_data = useSelector((state) => state.Reducers.restaurant_data)

    const navigate = useNavigate()


    const handlerating = (rate) => {
        setRating(rate)
        // console.log(rating)
        setTimeout(() => {
            navigate(`/feedback`, {
                state: {
                    rating: rate
                }
            })
        }, 500)
    }

    return (
        <AnimatePresence>
            {isOpen ? (
                <motion.div
                    ref={ref}
                    key="sidebar"
                    className="bottom-0 min-h-[300px] max-h-[400px] h-full w-screen mb-0 p-4 bg-gray-100 
          rounded-t-3xl fixed z-50"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{
                        y: 100,
                        opacity: 0.5,
                        transition: { ease: 'easeInOut', duration: 0.5 }
                    }}
                    transition={{
                        ease: 'easeOut',
                        duration: 0.3
                    }}
                >
                    <div className="flex justify-between w-full p-4 pb-0 -mb-5">
                        <p className="font-medium text-xl">Pay Your Bill</p>
                        <button onClick={() => setIsopen(false)} className="">
                            <img
                                src={image.close}
                                alt="close"
                                className="h-[20px] w-[20px]"
                            />
                        </button>
                    </div>
                    <div className="flex fex-col justify-center items-center h-full w-full">
                        <div className="h-fit w-fit gap-2 flex flex-col justify-center items-center">
                            <img
                                src={restaurant_data?.image}
                                alt="icon"
                                className="h-[100px] w-[100px] bg-amber-500 rounded-full relative  object-contain shadow-md self-center"
                            />
                            <div className="w-full h-full">
                                <p className="text-pretty text-center font-medium">
                                    Share your experience <br />
                                    at {restaurant_data?.name}
                                </p>
                            </div>
                            <div className="w-full h-full flex justify-center">
                                <Rating
                                    emptySymbol={<IoIosStarOutline />}
                                    fullSymbol={<IoIosStar />}
                                    className="text-4xl space-x-5"
                                    initialRating={rating}
                                    onChange={(rate) => handlerating(rate)}
                                />
                            </div>
                            <div className="w-full h-full flex justify-center">
                                {error ? (
                                    <p className="text-red-500">
                                        Select payment method*
                                    </p>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    )
}
