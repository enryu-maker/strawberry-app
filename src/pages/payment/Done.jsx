import React from 'react';
import Lottie from "lottie-react";
import { animation } from '../../assets/animation';
import { useSelector } from 'react-redux';
import { image } from '../../assets/image';
import { useNavigate } from 'react-router-dom';
import Feedback from '../../modals/Feedback';

export default function Done() {
    const access = useSelector(state => state.Reducers.access);
    const navigate = useNavigate()
    const [showfeedback, setshowfeedback] = React.useState(false)

    return (
        <div className="flex flex-col items-center justify-center bg-[#22b14c] font-SUSE min-h-screen p-5">
            <Lottie
                animationData={animation.pay}
                loop={true}
                className="w-[250px] h-[250px] mb-5"
            />
            <h1 className="text-4xl font-bold text-center text-white mb-2">
                Payment Complete!
            </h1>
            <p className="mt-2 text-xl text-center text-white">
                You've earned some royalty points!
            </p>
            <p className="text-2xl flex font-medium items-center space-x-2 text-white mb-5 bg-opacity-70 mt-4 bg-white rounded-full p-4 px-5 shadow-lg">
                <span className="font-bold text-black">20</span>
                <img src={image.logo} className="w-6 h-6" alt="Coins" />
                {/* <span>coins</span> */}
            </p>

            {!access && (
                <div className="mt-4 bg-red-100 border-l-4 border-red-500 p-4 rounded-md">
                    <p className="text-red-800">
                        ⚠️ Important: If you don't log in, your royalty points will be lost!
                    </p>
                </div>
            )}
            <div className="flex w-[90%] justify-between items-center mt-10">
                <button
                    onClick={() => {
                        navigate('/login')
                    }}
                    className=' bg-gray-300 text-black w-[44%] flex justify-center items-center  md:w-1/2 py-4 font-medium text-lg rounded-full font-SUSE   mb-6 md:mb-0 '>
                    <p>Login</p>
                </button>
                <button
                    onClick={() => {
                        setshowfeedback(true)
                    }}
                    className=' bg-primary text-white w-[44%] flex justify-center items-center  md:w-1/2 py-4 font-medium text-lg rounded-full font-SUSE   mb-6 md:mb-0 '>
                    <p>Continue</p>
                </button>
            </div>
            <Feedback
                isOpen={showfeedback}
                setIsOpen={setshowfeedback}
            />

        </div>
    );
}
