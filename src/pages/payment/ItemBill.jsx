import React from 'react'
import { image } from '../../assets/image'
import CircularButton from '../../components/CircularButton'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import SideNav from '../home/modals/SideNav'
import CustomButton from '../../components/CustomButton'
import BottomOptions from '../home/modals/BottomOptions'
import { AiOutlineMenu, AiOutlineUser } from 'react-icons/ai'

export default function ItemBill() {
    const navigate = useNavigate()
    const [show, setShow] = React.useState(false)
    const [bottomshow, setBottomshow] = React.useState(false)
    return (
        <div className="h-screen overflow-x-hidden">
            <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ ease: 'anticipate', duration: 1 }}
                className={`bg-slate-100 flex flex-col h-full items-center justify-center 
        w-screen `}
            >
                <div className="flex justify-between top-0 sticky z-50 bg-white px-5 py-5 h-[70px] items-center w-full">
                    <button
                        className="h-[35px] w-[35px] flex justify-center items-center bg-primary rounded-full"
                        onClick={() => {
                            setShow(!show)
                        }}
                    >
                        <AiOutlineMenu className="text-white text-xl" />
                    </button>
                    <h1 className=" font-Facinate text-4xl text-primary">Pay Bill</h1>
                    <AnimatePresence>
                        <button
                            onClick={() => {
                                navigate('/login')
                            }}
                            className="h-[35px] w-[35px] flex justify-center items-center bg-primary rounded-full"
                        >
                            <AiOutlineUser className="text-white text-xl" />
                        </button>
                    </AnimatePresence>
                </div>
                {show ? <SideNav isOpen={show} setIsopen={setShow} /> : null}
                <div
                    style={{
                        opacity: bottomshow ? 0.3 : 1,
                        transition: 'opacity 0.5s ease'
                    }}
                    className="flex flex-col z-0 bg-white items-center px-5 justify-center w-full py-8 font-SUSE"
                >
                    <div className="flex justify-between w-full items-start">
                        <div className="space-y-1">
                            <p className=" font-Poppins text-lg font-semibold">
                                Pay Your Table Bill
                            </p>
                            <p className=" font-Poppins text-xs text-gray-400">
                                Table no 2369
                            </p>
                        </div>
                        <p className=" font-Poppins text-lg font-semibold">
                            $122.1
                        </p>
                    </div>
                </div>
                <hr className="w-full"></hr>
                <div
                    className="flex flex-col bg-white
        gap-5 items-start px-5 py-4 justify- mt-5 h-full w-full overflow-y-auto font-SUSE"
                >
                    <div className="flex flex-row justify-between w-full h-fit text-md">
                        <div className="flex flex-row justify-evenly items-start align-middle space-x-5 max-w-screen">
                            <p className="bg-gray-100 p-1 px-2 rounded-md text-xs">
                                1
                            </p>
                            <p>Items</p>
                        </div>
                        <div>
                            <p>$69</p>
                        </div>
                    </div>
                </div>
                <div className="w-full min-h-[200] h-fit p-4 flex flex-col justify-end items-end align-bottom pb-10 font-SUSE">
                    <CustomButton
                        text={'PAY OR SPLIT'}
                        style={'mb-0'}
                        onClick={() => {
                            setBottomshow(!bottomshow)
                        }}
                    />
                </div>
                {bottomshow ? (
                    <BottomOptions
                        isOpen={bottomshow}
                        setIsopen={setBottomshow}
                    />
                ) : null}
            </motion.div>
        </div>
    )
}
