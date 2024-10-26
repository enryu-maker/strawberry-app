import React from 'react'
import { image } from '../../assets/image'
import CircularButton from '../../components/CircularButton'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import CustomButton from '../../components/CustomButton'

// import BottomOptions from '../home/modals/BottomOptions'
import { AiOutlineMenu, AiOutlineUser } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { getMode, getOrder } from '../../store/actions/sessionAction'
import SideNav from '../../modals/SideNav'
import Bottom from '../../modals/Bottom'

export default function PayBill() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const session_id = useSelector(state => state.Reducers.session_id)
    const table_id = useSelector(state => state.Reducers.table_id)
    const user_id = parseInt(useSelector(state => state.Reducers.user_id))



    const [show, setShow] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [data, setData] = React.useState([])
    const [mode, setMode] = React.useState([])
    const [bottomshow, setBottomshow] = React.useState(false)
    const [selectedMode, setSelectedMode] = React.useState('')
    function getTotal(data) {
        return data.reduce((total, item) => {
            return total + (item.order_total || 0); // Add the price if it exists, otherwise add 0
        }, 0); // Start with a total of 0
    }
    function formatData(data) {
        var filteredData = [];

        // Check if the selectedMode is set and its first item has the type 'my_items_only'
        if (selectedMode?.[0]?.type === "my_items_only") {
            // Filter the data to include only items where the user_id matches
            filteredData = data?.filter(item => item?.user_id === user_id);
            console.log("Filtered Data:", filteredData);
            return filteredData;
        }
        // If the condition doesn't match, return the full data set
        else {
            return data;
        }
    }


    React.useEffect(() => {
        dispatch(getOrder(session_id, setLoading, setData))
        dispatch(getMode(setMode, setLoading, session_id, user_id))
    }, [dispatch])
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
                        // opacity: bottomshow ? 0.3 : 1,
                        transition: 'opacity 0.5s ease'
                    }}
                    className="flex flex-col z-0 bg-white items-center px-5 justify-center w-full py-8 font-SUSE"
                >
                    <div className="flex justify-between w-full items-start">
                        <div className="space-y-1">
                            <p className=" font-Poppins text-lg font-semibold">
                                Total Bill
                            </p>
                            <p className=" font-Poppins text-xs text-gray-400">
                                Table no. {table_id}
                            </p>
                        </div>
                        <p className=" font-Poppins text-lg font-semibold">
                            € {getTotal(data)}
                        </p>
                    </div>
                </div>
                <hr className="w-full"></hr>
                <div
                    className="flex flex-col bg-white gap-5 items-start px-5 py-4 mt-5 h-full w-full overflow-y-auto font-SUSE"
                >
                    {
                        data?.map((item, index) => (
                            <div className={`flex flex-row justify-between w-full h-fit text-md`}>
                                <div className="flex flex-row justify-evenly items-start align-middle space-x-5 max-w-screen">
                                    <p className="bg-gray-100 p-1 px-2 rounded-md text-xs">
                                        {index + 1}
                                    </p>
                                    <div>
                                        <p className=' font-SUSE text-sm'> {item?.name}</p>
                                        <p className=' font-SUSE text-xs'> Qty. {item?.quantity}</p>
                                    </div>
                                </div>
                                <div>
                                    <p> € {item?.order_total}</p>
                                </div>
                            </div >
                        ))

                    }

                </div>
                <div className="w-full min-h-[200] h-fit p-4 flex flex-col justify-end items-end align-bottom pb-10 font-SUSE">
                    <CustomButton
                        text={'Pay or split bill'}
                        style={'mb-0'}
                        onClick={() => {
                            setBottomshow(!bottomshow)
                        }}
                    />
                </div>
                <Bottom
                    setBottomshow={setBottomshow}
                    bottomshow={bottomshow}
                    paymentMethods={mode}
                    setSelectedMode={setSelectedMode}
                    cartData={data}
                />
            </motion.div>
        </div>
    )
}
