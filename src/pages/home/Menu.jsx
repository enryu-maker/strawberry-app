import React from 'react';
import { AiOutlineMenu, AiOutlineUser } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMenu, getRestaurant } from '../../store/actions/homeActions';
import { AnimatePresence } from 'framer-motion';
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from '@material-tailwind/react';
import MenuCard from '../../components/MenuCard';
import { RotatingLines } from 'react-loader-spinner';
import SideNav from '../../modals/SideNav';

export default function Menu() {
    const [show, setShow] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    React.useEffect(() => {
        const params = new URLSearchParams(location.search);
        dispatch(getRestaurant(params.get('restaurant_id')));
        dispatch(getMenu(params.get('restaurant_id')));
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [dispatch, location.search]);

    const cart = useSelector((state) => state.Reducers.cart);
    const menu = useSelector((state) => state.Reducers.menu);
    const [activeTab, setActiveTab] = React.useState(menu[0]?.value);

    return (
        <div className="bg-white w-full h-screen">
            <div className="flex justify-between fixed top-0 z-50 bg-white px-4 py-3  w-full">
                <button
                    className="h-10 w-10 flex justify-center items-center bg-primary rounded-full shadow hover:shadow-lg transition"
                    onClick={() => setShow(!show)}
                >
                    <AiOutlineMenu className="text-white text-lg" />
                </button>
                <h1 className="font-Facinate text-3xl text-primary">Menu</h1>
                <AnimatePresence>
                    <button
                        onClick={() => navigate('/login')}
                        className="h-10 w-10 flex justify-center items-center bg-primary rounded-full shadow hover:shadow-lg transition"
                    >
                        <AiOutlineUser className="text-white text-lg" />
                    </button>
                </AnimatePresence>
            </div>

            {show && <SideNav isOpen={show} setIsopen={setShow} />}
            {!loading ? (
                <>
                    <Tabs value={menu[0]?.value}>
                        <TabsHeader
                            className="rounded-none fixed h-[60px] top-[60px] w-full bg-white z-20 p-0 overflow-x-scroll "
                            indicatorProps={{
                                className: 'bg-white border-b-2 border-primary rounded-none',
                            }}
                        >
                            {menu?.map(({ label, value }) => (
                                <Tab
                                    className={`font-SUSE h-[40px] font-semibold text-lg ${activeTab === value ? 'text-primary' : 'text-gray-800'}`}
                                    onClick={() => setActiveTab(value)}
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
                                unmount: { y: 250 },
                            }}
                            className="pb-[70px] pt-[140px] overflow-y-auto"
                        >
                            {menu?.map(({ value, data }) => (
                                <TabPanel
                                    className="text-gray-800 font-SUSE"
                                    key={value}
                                    value={value}
                                >
                                    {data?.map((item, index) => (
                                        <div key={index} className="py-2">
                                            <h1 className="font-bold text-xl pb-2 text-primary">{item?.category}</h1>
                                            {item?.menu_items?.map((menuItem, index) => (
                                                <MenuCard key={index} item={menuItem} />
                                            ))}
                                        </div>
                                    ))}
                                </TabPanel>
                            ))}
                        </TabsBody>
                    </Tabs>
                    {cart?.length > 0 && (
                        <div className="flex sticky bottom-[0px] font-SUSE text-white text-lg w-full justify-center z-20 items-center">
                            <button
                                onClick={() => navigate('/order-details')}
                                className="bg-primary flex justify-center items-center  w-[100%] h-[55px] shadow-lg hover:shadow-xl transition"
                            >
                                View your order{' '}
                                <span className="h-[30px] w-[30px] font-bold bg-white ml-3 text-primary rounded-full flex items-center justify-center">
                                    {cart?.length}
                                </span>
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex justify-center h-screen w-screen flex-col space-y-4 items-center">
                    <RotatingLines
                        // visible={true}
                        height="30"
                        width="30"
                        strokeColor={"#E85050"}
                        strokeWidth="5"
                        animationDuration="1"
                        ariaLabel="rotating-lines-loading"
                    />
                    <p className="text-xs text-gray-600">
                        — Your culinary journey begins shortly. —
                    </p>
                </div>
            )}
        </div>
    );
}
