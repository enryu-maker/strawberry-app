import React, { useState } from 'react'
import Rating from 'react-rating'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { IoIosStarOutline } from 'react-icons/io'
import { IoIosStar } from 'react-icons/io'
import { FaFaceLaughBeam } from 'react-icons/fa6'
import { FaRegFaceLaughBeam } from 'react-icons/fa6'
import CustomButton from '../../components/CustomButton'

function Feedback() {
    const location = useLocation()
    const rating = location.state.rating
    const navi = useNavigate()
    const handleclick = () => {
        setTimeout(() => {
            navi('/restaurants/2/CBB-2-1-450')
        }, 1000)
    }
    let count = 0
    const countt = () => count++
    const [foodrating, setFoodrating] = useState('')
    const [service, setService] = useState('')
    const [ambiance, setAmbiance] = useState('')
    const [valueformoney, setValueformoney] = useState('')
    return (
        <>
            <div className="flex justify-center items-center h-screen w-full bg-gray-200 p-4 ">
                <div className="w-full h-full justify-start pt-20 flex flex-col gap-5 items-center">
                    <Rating
                        initialRating={rating}
                        readonly
                        emptySymbol={
                            <IoIosStarOutline className="text-green-500" />
                        }
                        fullSymbol={<IoIosStar className="text-green-500" />}
                        className="text-3xl space-x-5"
                    />
                    <div className="flex flex-col gap-2 text-center">
                        <p className="font-medium">Can you tell us more?</p>
                        <p className="text-gray-500">
                            You have been served by Chris!
                        </p>
                    </div>
                    <div className="flex flex-col gap-5 w-full h-fit">
                        <div className="flex items-center justify-between w-full">
                            <p className="font-medium">Food and drink</p>
                            <div>
                                <Rating
                                    emptySymbol={
                                        <FaRegFaceLaughBeam className="text-green-500" />
                                    }
                                    fullSymbol={
                                        <FaFaceLaughBeam className="text-green-500" />
                                    }
                                    className=" text-3xl space-x-2"
                                    id={countt}
                                    initialRating={foodrating}
                                    onChange={(rate) => setFoodrating(rate)}
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <p className="font-medium">Service</p>
                            <div>
                                <Rating
                                    emptySymbol={
                                        <FaRegFaceLaughBeam className="text-green-500" />
                                    }
                                    fullSymbol={
                                        <FaFaceLaughBeam className="text-green-500" />
                                    }
                                    className=" text-3xl space-x-2"
                                    id={countt}
                                    initialRating={service}
                                    onChange={(rate) => setService(rate)}
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <p className="font-medium">Ambiance</p>
                            <div>
                                <Rating
                                    emptySymbol={
                                        <FaRegFaceLaughBeam className="text-green-500" />
                                    }
                                    fullSymbol={
                                        <FaFaceLaughBeam className="text-green-500" />
                                    }
                                    className=" text-3xl space-x-2"
                                    id={countt}
                                    initialRating={ambiance}
                                    onChange={(rate) => setAmbiance(rate)}
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <p className="font-medium">Value for money</p>
                            <div>
                                <Rating
                                    emptySymbol={
                                        <FaRegFaceLaughBeam className="text-green-500" />
                                    }
                                    fullSymbol={
                                        <FaFaceLaughBeam className="text-green-500" />
                                    }
                                    className=" text-3xl space-x-2"
                                    id={countt}
                                    initialRating={valueformoney}
                                    onChange={(rate) => setValueformoney(rate)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col h-full w-full justify-end pb-10">
                        <CustomButton text={'Continue'} onClick={handleclick} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Feedback
