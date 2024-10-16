import React, { useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { image } from '../../assets/image'
import CustomButton from '../../components/CustomButton'
import TipOptions from './modals/TipOptions'
import { useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

function Tip() {
    const { state } = useLocation()
    console.log(state)
    const [selectedTip, setSelectedTip] = useState(null)
    const [bottomshow, setBottomshow] = React.useState(false)
    const [tipamount, setTipamount] = React.useState('')
    const navigate = useNavigate()

    const tips = [
        { percentage: '20', emoji: '😋' },
        { percentage: '25', emoji: '😘' },
        { percentage: '30', emoji: '❤️' }
    ]
    const handletipamount = (amount) => {
        setTipamount(amount)
    }
    const handleTipSelection = (index) => {
        setSelectedTip(index)
    }
    const handlesubmit = (e) => {
        if (e) e.preventDefault()
    }
    const handleinputsubmit = (e) => {
        setTipamount(e.target.value)
    }

    return (
        <AnimatePresence>
            <motion.div
                className="w-screen h-full font-SUSE"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ ease: 'easeIn', duration: 0.5 }}
            >
                <div className="flex flex-col p-4 gap-2 w-full h-screen">
                    <div className="flex space-x-4 w-full justify-start items-start h-fit">
                        <div className="w-fit h-fit fixed left-0">
                            <IoIosArrowBack
                                className="text-2xl"
                                onClick={() => navigate(-1)}
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full h-full pt-1 justify-center align-middle text-center">
                            <div>
                                <hr className="p-[2px] rounded-lg bg-black"></hr>
                            </div>
                            <div>
                                <p className="text-sm font-base">Tip</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 w-full pt-1 justify-center align-middle text-center">
                            <div>
                                <hr className="p-[2px] rounded-lg bg-black opacity-50"></hr>
                            </div>
                            <div>
                                <p className="text-sm font-base">Pay</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-fit flex justify-center mb-16">
                        <div>
                            <img src={image.pen} className="w-24" />
                        </div>
                        <div className="flex flex-col justify-end">
                            <p className="text-3xl text-center -mb-10 -rotate-12 text-primary font-medium">
                                You Are <br />
                                The Best !
                            </p>
                        </div>
                    </div>
                    <div className="w-full h-fit flex">
                        <p className="text-2xl text-center w-full text-black font-Poppins">
                            Say thanks to{' '}
                            <span className="text-primary">chris</span>
                            <br />
                            with a tip !
                        </p>
                    </div>
                    <div className="flex justify-evenly h-fit pb-10 w-full">
                        {tips.map((tip, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center"
                                onClick={() => {
                                    handleTipSelection(index)
                                    handletipamount(Math.round(tip.percentage / 100 * state?.amount))
                                }}
                            >
                                <div
                                    className={`w-24 h-24 rounded-xl flex flex-col text-center justify-center items-center  ${selectedTip === index
                                        ? 'bg-primary'
                                        : 'bg-gray-100 '
                                        }`}
                                >
                                    <p
                                        className={`font-bold text-md ${selectedTip === index
                                            ? 'text-white'
                                            : 'text-black '
                                            }`}
                                    >
                                        {tip.percentage}%
                                    </p>
                                </div>
                                <div className="-mt-4 text-2xl">
                                    {tip.emoji}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="w-full h-full flex justify-center">
                        <div className="w-40 h-40 border-2 rounded-xl p-4 flex flex-col justify-evenly items-center">
                            <p className="text-center ">Custom Tip</p>
                            <div>
                                <input
                                    type="text"
                                    value={tipamount}
                                    className="w-14 p-2 h-8 rounded-lg border-[1px]"
                                    onChange={(e) => handleinputsubmit(e)}
                                />
                                &nbsp;$
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-full flex items-end pb-10">
                        <CustomButton
                            text={'Confirm'}
                            onClick={(e) => {
                                e.preventDefault()
                                setBottomshow(!bottomshow)
                                handlesubmit()
                            }}
                        />
                    </div>
                </div>
                {tipamount && bottomshow ? (
                    <TipOptions
                        isOpen={bottomshow}
                        setIsopen={setBottomshow}
                        tip={tipamount}
                        total={state?.amount}
                        data={state}
                    />
                ) : null}
            </motion.div>
        </AnimatePresence>
    )
}

export default Tip
