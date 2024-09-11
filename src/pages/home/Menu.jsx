import React from 'react'
import { AiOutlineMenu, AiOutlineUser } from 'react-icons/ai'
import SideNav from './modals/SideNav'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getMenu, getRestaurant } from '../../store/actions/homeActions'
import { AnimatePresence } from 'framer-motion'
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel
} from '@material-tailwind/react'
import MenuCard from '../../components/MenuCard'
import { RotatingLines } from 'react-loader-spinner'
export default function Menu() {
    const [show, setShow] = React.useState(false)
    const [loading, setLoading] = React.useState(true)
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    React.useEffect(() => {
        const params = new URLSearchParams(location.search)
        dispatch(getRestaurant(params.get('restaurant_id')))
        dispatch(getMenu(params.get('restaurant_id')))
        setTimeout(() => {
            setLoading(false)
        }, 1500)
    }, [dispatch, location.search])
    const cart = useSelector((state) => state.Reducers.cart)
    const menu = useSelector((state) => state.Reducers.menu)
    console.log(menu[0]?.value)
    const [activeTab, setActiveTab] = React.useState(menu[0]?.value)
    return (
        <div className="bg-white w-full h-[100vh]">
            <div className="flex justify-between top-0 sticky z-50 bg-white px-5 py-5 h-[70px] items-center w-full">
                <button
                    className="h-[35px] w-[35px] flex justify-center items-center bg-primary rounded-full"
                    onClick={() => {
                        setShow(!show)
                    }}
                >
                    <AiOutlineMenu className="text-white text-xl" />
                </button>
                <h1 className=" font-Facinate text-4xl text-primary">Menu</h1>
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
            {!loading ? (
                <Tabs value={menu[0]?.value}>
                    <TabsHeader
                        className="rounded-none fixed bottom-0 w-full h-[70px] bg-white z-20 opacity-100 backdrop-blur-md p-0 overflow-x-scroll"
                        indicatorProps={{
                            className:
                                'bg-transparent border-b-2  border-primary shadow-none rounded-none'
                        }}
                    >
                        {menu.map(({ label, value }) => (
                            <Tab
                                className={
                                    activeTab === value
                                        ? 'text-primary font-SUSE font-semibold text-lg'
                                        : 'text-gray-800 font-SUSE font-semibold text-lg'
                                }
                                onClick={() => {
                                    setActiveTab(value)
                                }}
                                key={value}
                                value={value}
                            >
                                {label}
                            </Tab>
                        ))}
                    </TabsHeader>
                    <TabsBody
                        animate={{
                            initial: { y: 250 },
                            mount: { y: 0 },
                            unmount: { y: 250 }
                        }}
                        className="pb-[70px]"
                    >
                        {menu.map(({ value, data }) => (
                            <TabPanel
                                className="text-gray-800 font-SUSE"
                                key={value}
                                value={value}
                            >
                                {data.map((item, index) => (
                                    <div key={index} className="py-2">
                                        <h1 className="font-bold text-2xl pb-2 text-primary">
                                            {item?.category}
                                        </h1>
                                        {item?.menu_items?.map(
                                            (item, index) => (
                                                <MenuCard
                                                    key={index}
                                                    item={item}
                                                />
                                            )
                                        )}
                                    </div>
                                ))}
                            </TabPanel>
                        ))}
                    </TabsBody>
                </Tabs>
            ) : (
                <div className="flex justify-center flex-col space-y-4 items-center">
                    <RotatingLines
                        visible={true}
                        height="30"
                        width="20"
                        strokeColor="#e85050"
                        strokeWidth="5"
                        animationDuration="1"
                        ariaLabel="rotating-lines-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                    <p className=" text-xs">
                        — Your culinary journey begins shortly. —{' '}
                    </p>
                </div>
            )}

            {cart?.length > 0 ? (
                <div className="flex sticky bottom-[75px] font-SUSE text-white text-2xl w-full justify-center z-20 items-center">
                    <button
                        onClick={() => {
                            navigate('/order-details')
                        }}
                        className="  bg-primary flex justify-center items-center rounded-full w-[88%] h-[55px]"
                    >
                        View your order{' '}
                        <p className="h-[30px] w-[30px] font-bold bg-white ml-5 text-primary rounded-full">
                            {cart?.length}
                        </p>
                    </button>
                </div>
            ) : null}
        </div>
    )
}
