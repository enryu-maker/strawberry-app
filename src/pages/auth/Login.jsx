import React from 'react'

import TextInput from '../../components/TextInput'
import { AnimatePresence, motion } from 'framer-motion'
import { image } from '../../assets/image'
import CustomButton from '../../components/CustomButton'
import Header from '../../components/Header'
import { useDispatch } from 'react-redux'
import { loginAction } from '../../store/actions/authActions'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
export default function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [data, setData] = React.useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = React.useState(false)
    return (
        <AnimatePresence>
            <motion.div
                initial={{ x: 200, opacity: 0.2 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ ease: 'easeInOut', duration: 0.5 }}
                exit={{
                    x: -100,
                    opacity: 0.1,
                    transition: { ease: 'easeInOut', duration: 0.5 }
                }}
                className="  flex flex-col h-[100vh] w-[100vw]"
            >
                <Header />
                <div className="px-5 space-y-5 mt-5 flex flex-col  items-center ">
                    <p className="text-2xl self-center text-black font-semibold font-SUSE">
                        login
                    </p>
                    <TextInput
                        lable={'Email*'}
                        type="email"
                        onChange={(e) => {
                            setData({ ...data, email: e.target.value })
                        }}
                    />
                    <TextInput
                        lable={'Password*'}
                        type="password"
                        isPassword={true}
                        onChange={(e) => {
                            setData({ ...data, password: e.target.value })
                        }}
                    />
                    <a
                        href="/forgot-password"
                        className=" self-end font-SUSE text-primary font-medium"
                    >
                        Forgot Password?
                    </a>
                    <CustomButton
                        text={'login'}
                        disabled={loading}
                        onClick={() => {
                            if (data.email && data.password) {
                                dispatch(loginAction(data, setLoading))
                            } else {
                                toast.error('Please fill all the fields', {
                                    position: 'top-center',
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    theme: 'light',
                                    style: {
                                        fontFamily: 'SUSE'
                                    }
                                })
                            }
                        }}
                    />
                    <p className="text-md  text-black font-SUSE">
                        don't have an account ?{' '}
                        <button
                            onClick={() => {
                                navigate('/register')
                            }}
                            className="underline text-primary underline-offset-4"
                        >
                            sign up
                        </button>
                    </p>
                    <div className="flex w-full  justify-evenly items-center">
                        <hr className="w-[30%] h-[1px] bg-black" />
                        <p className="text-md text-black font-SUSE">
                            or login with
                        </p>
                        <hr className="w-[30%] h-[1px] bg-black" />
                    </div>
                    <div className="flex w-full flex-col  justify-between items-center">
                        <button className=" border-[1px] w-[100%]  rounded-lg bg-white px-2 py-4 border-black flex justify-center items-center space-x-2">
                            <img
                                alt="google"
                                className="h-[25px] w-[25px]"
                                src={image.google}
                            />
                            <p className="text-xl text-black font-semibold font-SUSE">
                                login with Google
                            </p>
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
