import React from 'react'
import { RotatingLines } from 'react-loader-spinner'

export default function CustomButton({
    text,
    style,
    onClick,
    disabled = false
}) {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`bg-primary text-white w-full flex justify-center items-center  md:w-1/2 py-4 font-SUSE font-medium text-lg rounded-full  mb-6 md:mb-0 ${style} `}
        >
            {disabled ? (
                <RotatingLines
                    visible={true}
                    height="20"
                    width="20"
                    strokeColor="#ffffff"
                    strokeWidth="5"
                    animationDuration="1"
                    ariaLabel="rotating-lines-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            ) : (
                text
            )}
        </button>
    )
}

export function CustomButton2({ text, style, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`bg-white text-primary w-full md:w-1/2 py-4 font-SUSE font-medium border-[1px] text-lg rounded-full mb-6 md:mb-0 ${style} `}
        >
            {text}
        </button>
    )
}
