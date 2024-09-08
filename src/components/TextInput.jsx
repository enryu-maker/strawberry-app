import React from 'react'
import { image } from '../assets/image'

export default function TextInput({
    lable,
    placeholder,
    type,
    error,
    value,
    onChange,
    isPassword = false
}) {
    const [show, setShow] = React.useState(false)
    return (
        <div className="w-full md:w-1/2  mb-6 md:mb-0 font-SUSE ">
            <label
                className="block font-SUSE tracking-wide text-text text-xs font-semibold mb-2"
                htmlFor={lable}
            >
                {lable}
            </label>
            <div className="flex w-full bg-white text-gray-700 border text-lg  rounded-lg py-4 px-4 mb-3">
                <input
                    value={value}
                    onChange={onChange}
                    className="appearance-none block w-full  leading-tight focus:outline-none focus:border-primary"
                    id={lable}
                    type={isPassword ? (show ? 'text' : type) : type}
                    placeholder={placeholder}
                />
                {type === 'password' ? (
                    <button
                        onClick={() => {
                            setShow(!show)
                        }}
                    >
                        {show ? (
                            <img
                                alt="view"
                                className="h-[25px] w-[25px]"
                                src={image?.view}
                            />
                        ) : (
                            <img
                                alt="hide"
                                className="h-[25px] w-[25px]"
                                src={image?.hide}
                            />
                        )}
                    </button>
                ) : null}
            </div>

            {error ? (
                <p className="text-red-500 text-xs italic">{error}</p>
            ) : null}
        </div>
    )
}
