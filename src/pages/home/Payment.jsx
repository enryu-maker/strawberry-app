import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { image } from '../../assets/image'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
export default function Payment() {
    const navigate = useNavigate()
    const [fpHash, setFpHash] = React.useState('')
    const tid = useSelector((state) => state.Reducers.table_id)
    console.log(tid)
    React.useEffect(() => {
        const setFp = async () => {
            const fp = await FingerprintJS.load()

            const { visitorId } = await fp.get()

            setFpHash(visitorId)
        }

        setFp()
    }, [])
    return (
        <div className="bg-white w-full h-[100vh] font-SUSE">
            <div className="flex justify-between top-0 sticky z-50  px-5 py-5 h-[10vh] items-center w-full">
                <button
                    className="h-[35px] w-[35px] flex justify-center items-center bg-primary rounded-full"
                    onClick={() => {
                        navigate(-1)
                    }}
                >
                    <IoIosArrowBack className="text-white text-xl" />
                </button>
                <h1 className="text-3xl font-Facinate text-primary font-bold">
                    Payment
                </h1>
            </div>
            <div className="flex justify-center flex-col space-y-4 items-center">
                <button
                    onClick={() => {
                        // logGoogleUser()
                    }}
                    className=" border-[1px] w-[92%] self-center  rounded-lg bg-white px-2 py-4 border-black flex justify-center items-center space-x-4"
                >
                    <img
                        alt="google"
                        className="h-[35px] w-[35px]"
                        src={image.now}
                    />
                    <p className="text-xl text-black font-semibold font-SUSE">
                        Pay As You Order
                    </p>
                </button>
                <button
                    onClick={() => {
                        // logGoogleUser()
                    }}
                    className=" border-[1px] w-[92%] self-center  rounded-lg bg-white px-2 py-4 border-black flex justify-center items-center space-x-4"
                >
                    <img
                        alt="google"
                        className="h-[35px] w-[35px]"
                        src={image.later}
                    />
                    <p className="text-xl text-black font-semibold font-SUSE">
                        Eat First, Pay Later
                    </p>
                </button>
                <p className=" font-SUSE">
                    By continuing, I agree to User Terms and Privacy Policy
                </p>
                <p className=" font-SUSE">secure payments with 🍓 strawberry</p>
            </div>
        </div>
    )
}
