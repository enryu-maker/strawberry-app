import React from 'react'
import { image } from '../../assets/image'
import CircularButton from '../../components/CircularButton'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import SideNav from '../home/modals/SideNav'
import CustomButton from '../../components/CustomButton'
import BottomOptions from '../home/modals/BottomOptions'

export default function Items() {
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
                {show ? <SideNav isOpen={show} setIsopen={setShow} /> : null}
                {/* <div
                    className="w-full h-full"
                    style={{
                        opacity: bottomshow ? 0.3 : 1,
                        backgroundColor: 'black',
                        transition: 'opacity 0.5s ease'
                    }}
                >
                    <div
                        style={{
                            backgroundImage: `url(${image.sample})`
                        }}
                        className={`h-full w-full bg-cover flex flex-col justify-between`}
                    >
                        <div className="flex justify-between px-5 h-[50px] items-center mt-2  w-full">
                            <CircularButton
                                onClick={() => {
                                    setShow(!show)
                                }}
                                src={image.menu}
                            />
                            <AnimatePresence>
                                <CircularButton
                                    src={image.user}
                                    onClick={() => {
                                        navigate('/login')
                                    }}
                                />
                            </AnimatePresence>
                        </div>
                        <img
                            src={image.sample}
                            alt="sample"
                            className="h-[100px] w-[100px] rounded-full  relative top-5 shadow-md self-center"
                        />
                    </div>
                </div> */}
                <div
                    style={{
                        opacity: bottomshow ? 0.3 : 1,
                        transition: 'opacity 0.5s ease'
                    }}
                    className="flex flex-col z-0 bg-white items-center px-5 justify-center w-full py-8"
                >
                    <div className="flex justify-between w-full items-start">
                        <div className="space-y-1">
                            <p className=" font-Poppins text-lg font-semibold">
                                Pay Your Bill
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
        gap-5 items-start px-5 py-4 justify- mt-5 h-full w-full overflow-y-auto"
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
                <div className="w-full min-h-[200] h-fit p-4 flex flex-col justify-end items-end align-bottom pb-10">
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
