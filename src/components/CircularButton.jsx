import React from 'react'

export default function CircularButton({ src, onClick }) {
    return (
        <button
            onClick={onClick}
            className="bg-white rounded-full shadow-lg flex justify-center items-center h-[40px] w-[40px]"
        >
            <img alt="src" className="h-[25px] w-[25px]" src={src} />
        </button>
    )
}
