import React from 'react'
import {
    AiFillFacebook,
    AiFillInstagram,
    AiFillTwitterCircle
} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { storeQRData, getRestaurant } from '../../store/actions/homeActions'
import { Init } from '../../store/actions/sessionAction'

export default function Home() {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const data = useSelector((state) => state.Reducers.restaurant_data)
    const session_id = useSelector((state) => state.Reducers.session_id)
    const user_id = useSelector((state) => state.Reducers.user_id)

    React.useEffect(() => {
        dispatch(
            storeQRData(
                location.pathname.split('/')[2],
                location.pathname.split('/')[3]
            )
        )
        dispatch(Init())
        dispatch(getRestaurant(location.pathname.split('/')[2]))
    }, [dispatch, location])

    return (
        <>
            {/* Section 1 */}
            <div
                style={{
                    backgroundImage: `url(${data?.restaurant_images?.HERO[0]})`,
                    backgroundSize: 'cover'
                }}
                className={`w-full h-[100vh]`}
            >
                <div className="w-full h-[70px] z-50 flex justify-between px-5 items-center bg-transparent  fixed top-0">
                    <img
                        alt="icon"
                        src={data?.image}
                        className="h-[50px] w-[50px] rounded-full object-contain"
                    />
                </div>
                <div className="h-full w-full flex flex-col justify-evenly items-center">
                    <h1 className=" font-Sevillana capitalize font-semibold text-7xl text-center">
                        {data?.tag_line}
                    </h1>
                    <h2 className="  uppercase text-primary font-Facinate text-3xl">
                        * word of <br /> Disfrutón
                    </h2>
                    <div className=" w-full flex justify-around self-center h-[70px] items-center fixed bottom-0 z-50 backdrop-blur-lg">
                        <button
                            onClick={() => {
                                navigate(
                                    `/menu/?restaurant_id=${location.pathname.split('/')[2]
                                    }&restaurant_name=${data?.name}`
                                )
                            }}
                            className=" bg-primary outline-none  font-semibold  h-[40px] w-[40%] rounded-full text-2xl font-SUSE text-white"
                        >
                            View Menu
                        </button>

                        <button
                            onClick={() => {
                                navigate(
                                    session_id !== null && user_id !== null ? '/items-bill' : `/empty-cart/?restaurant_id=${location.pathname.split('/')[2]
                                        }&restaurant_name=${data?.name}`
                                )
                            }}
                            className=" border-primary border-2 lowercase bg-white  outline-none font-semibold  h-[40px] w-[40%] rounded-full text-2xl font-SUSE text-primary ">
                            Pay bill
                        </button>

                    </div>
                </div>
            </div>
            {/* Section 2 */}
            <div
                style={{
                    backgroundImage: `url(${data?.restaurant_images?.HERO1[0]})`,
                    backgroundSize: 'cover'
                }}
                className=" w-full h-[100vh] bg-red-200 object-contain flex flex-col justify-center items-center"
            >
                <div className=" backdrop-blur-sm py-4">
                    <h1 className=" font-Facinate text-white text-4xl text-center">
                        {data?.name}
                    </h1>
                    <p className="mt-5 font-SUSE font-bold capitalize px-3 text-white text-justify">
                        {data?.description}
                    </p>
                </div>
            </div>
            {/* Section 3 */}
            <div className=" w-[100vw] object-contain py-5  flex flex-col justify-center items-center">
                <h1 className=" font-Facinate capitalize text-4xl pb-5 font-bold text-primary text-center">
                    restaurant Images
                </h1>
                <div className="grid grid-cols-2 gap-y-2 w-full sm:grid-cols-3 sm:gap-y-4">
                    {data?.restaurant_images?.SLIDER.map((image, index) => (
                        <div
                            key={index}
                            className={`relative ${index % 5 === 0 ? 'col-span-2 row-span-2' : ''
                                } mx-2`}
                        >
                            <img
                                alt="icon"
                                src={image}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
            {/* Section 4 */}
            <div className=" w-[100vw] object-contain py-5  flex flex-col justify-center items-center">
                <h1 className=" font-Facinate capitalize text-4xl pb-5 font-bold text-primary text-center">
                    restaurant Socials
                </h1>
                <div className="flex mt-5 space-x-3">
                    <AiFillFacebook size={35} />
                    <AiFillInstagram size={35} />
                    <AiFillTwitterCircle size={35} />
                </div>
            </div>
            {/* Section 5 */}
            <h1 className=" font-SUSE text-xl py-3 pb-[80px] text-black text-center">
                🍓 strawberryclub&#8482;
            </h1>
        </>
    )
}
