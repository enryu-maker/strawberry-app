import React from 'react'
import { AiOutlineMenu, AiOutlineUser } from 'react-icons/ai'
import SideNav from './modals/SideNav'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getRestaurant } from '../../store/actions/homeActions'
import { AnimatePresence } from 'framer-motion'
export default function Menu() {
    const [show, setShow] = React.useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const params = new URLSearchParams(location.search)
    React.useEffect(() => {
        dispatch(getRestaurant(params.get('restaurant_id')))
    }, [dispatch])
    return (
        <div className="bg-primary w-full h-[100vh]">
            <div className="flex justify-between px-5 py-5 h-[70px] items-center w-full">
                <button
                    className="h-[35px] w-[35px] flex justify-center items-center bg-white rounded-full"
                    onClick={() => {
                        setShow(!show)
                    }}
                >
                    <AiOutlineMenu className="text-primary text-xl" />
                </button>
                <h1 className=" font-Facinate text-4xl text-white">Menu</h1>
                <AnimatePresence>
                    <button
                        onClick={() => {
                            navigate('/login')
                        }}
                        className="h-[35px] w-[35px] flex justify-center items-center bg-white rounded-full"
                    >
                        <AiOutlineUser className="text-primary text-xl" />
                    </button>
                </AnimatePresence>
            </div>
            {show ? <SideNav isOpen={show} setIsopen={setShow} /> : null}
        </div>
    )
}
