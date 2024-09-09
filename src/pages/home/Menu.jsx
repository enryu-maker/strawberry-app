import React from 'react'
import { AiOutlineMenu, AiOutlineUser } from 'react-icons/ai'
import SideNav from './modals/SideNav'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getRestaurant } from '../../store/actions/homeActions'
import { AnimatePresence } from 'framer-motion'
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel
} from '@material-tailwind/react'
import MenuCard from '../../components/MenuCard'
export default function Menu() {
    const [show, setShow] = React.useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const [activeTab, setActiveTab] = React.useState('Drinks')
    React.useEffect(() => {
        const params = new URLSearchParams(location.search)
        dispatch(getRestaurant(params.get('restaurant_id')))
    }, [dispatch, location.search])
    const data = [
        {
            label: 'Drinks',
            value: 'drinks',
            data: [
                {
                    cateogry: 'Fizzy',
                    menu_item: [
                        {
                            id: 1,
                            name: 'Coca-Cola',
                            price: 4.0,
                            image: 'https://picsum.photos/200/300',
                            description:
                                'Classic fizzy cola with a bold, refreshing taste.'
                        },
                        {
                            id: 2,
                            name: 'Fanta',
                            price: 4.0,
                            image: 'https://picsum.photos/200/300',
                            description:
                                'Orange-flavored soda with a zesty, citrusy punch.'
                        },
                        {
                            id: 3,
                            name: 'Pepsi',
                            price: 4.0,
                            image: 'https://picsum.photos/200/300',
                            description:
                                'Sweet and smooth cola, perfect for any occasion.'
                        },
                        {
                            id: 4,
                            name: 'Sprite',
                            price: 4.0,
                            image: 'https://picsum.photos/200/300',
                            description:
                                'Lemon-lime soda that is light and crisp.'
                        }
                    ]
                },
                {
                    cateogry: 'Cocktails',
                    menu_item: [
                        {
                            id: 5,
                            name: 'Moscow Mule',
                            price: 11.0,
                            image: 'https://picsum.photos/200/300',
                            description:
                                'A refreshing mix of vodka, ginger beer, and lime.'
                        },
                        {
                            id: 6,
                            name: 'Margaritas',
                            price: 11.0,
                            image: 'https://picsum.photos/200/300',
                            description:
                                'Classic margarita with tequila, lime, and a salt rim.'
                        },
                        {
                            id: 7,
                            name: 'Amaretto Sour',
                            price: 11.0,
                            image: 'https://picsum.photos/200/300',
                            description:
                                'Sweet and tangy cocktail with almond-flavored amaretto.'
                        },
                        {
                            id: 8,
                            name: 'Mojito',
                            price: 11.0,
                            image: 'https://picsum.photos/200/300',
                            description:
                                'Minty rum cocktail with a splash of soda and lime.'
                        }
                    ]
                },
                {
                    cateogry: 'Coffees',
                    menu_item: [
                        {
                            id: 9,
                            name: 'Iced Latte',
                            price: 6.0,
                            image: 'https://picsum.photos/200/300',
                            description:
                                'Chilled espresso with milk, served over ice.'
                        },
                        {
                            id: 10,
                            name: 'Americano',
                            price: 6.0,
                            image: 'https://picsum.photos/200/300',
                            description:
                                'Strong and bold espresso with hot water for a smoother taste.'
                        },
                        {
                            id: 11,
                            name: 'Fredo Cappuccino',
                            price: 6.0,
                            image: 'https://picsum.photos/200/300',
                            description:
                                'Iced cappuccino with a frothy top, perfect for summer.'
                        },
                        {
                            id: 12,
                            name: 'Fredo Espresso',
                            price: 6.0,
                            image: 'https://picsum.photos/200/300',
                            description:
                                'Chilled espresso with a smooth, strong flavor.'
                        }
                    ]
                }
            ]
        },
        {
            label: 'Dinner',
            value: 'dinner',
            data: [
                {
                    cateogry: 'Main Course',
                    menu_item: [
                        {
                            id: 13,
                            name: 'Grilled Steak',
                            price: 25.0,
                            image: 'https://picsum.photos/200/300',
                            description:
                                'Juicy, tender grilled steak served with garlic butter.'
                        },
                        {
                            id: 14,
                            name: 'Roast Chicken',
                            price: 18.0,
                            image: 'https://picsum.photos/200/300',
                            description:
                                'Oven-roasted chicken with herbs, served with mashed potatoes.'
                        },
                        {
                            id: 15,
                            name: 'Spaghetti Bolognese',
                            price: 15.0,
                            image: 'https://picsum.photos/200/300',
                            description:
                                'Classic Italian pasta dish with rich, slow-cooked beef sauce.'
                        },
                        {
                            id: 16,
                            name: 'Vegetable Stir-fry',
                            price: 12.0,
                            image: 'https://picsum.photos/200/300',
                            description:
                                'A healthy stir-fry with mixed vegetables and soy sauce.'
                        }
                    ]
                },
                {
                    cateogry: 'Desserts',
                    menu_item: [
                        {
                            id: 17,
                            name: 'Chocolate Lava Cake',
                            price: 7.0,
                            image: 'https://picsum.photos/200/300',
                            description:
                                'Warm chocolate cake with a gooey molten center.'
                        },
                        {
                            id: 18,
                            name: 'Cheesecake',
                            price: 6.5,
                            image: 'https://picsum.photos/200/300',
                            description:
                                'Creamy cheesecake with a buttery graham cracker crust.'
                        },
                        {
                            id: 19,
                            name: 'Fruit Salad',
                            price: 5.0,
                            image: 'https://picsum.photos/200/300',
                            description:
                                'Fresh seasonal fruits served in a light syrup.'
                        },
                        {
                            id: 20,
                            name: 'Tiramisu',
                            price: 7.5,
                            image: 'https://picsum.photos/200/300',
                            description:
                                'Classic Italian dessert with coffee, mascarpone, and cocoa.'
                        }
                    ]
                }
            ]
        }
    ]
    const cart = useSelector((state) => state.Reducers.cart)
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
            <Tabs value="drinks">
                <TabsHeader
                    className="rounded-none fixed bottom-0 w-full h-[70px] bg-white z-20 opacity-100 backdrop-blur-md p-0 overflow-x-scroll"
                    indicatorProps={{
                        className:
                            'bg-transparent border-b-2  border-primary shadow-none rounded-none'
                    }}
                >
                    {data.map(({ label, value }) => (
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
                    {data.map(({ value, data }) => (
                        <TabPanel
                            className="text-gray-800 font-SUSE"
                            key={value}
                            value={value}
                        >
                            {data.map((item, index) => (
                                <div key={index} className="py-2">
                                    <h1 className="font-bold text-2xl pb-2 text-primary">
                                        {item?.cateogry}
                                    </h1>
                                    {item?.menu_item?.map((item, index) => (
                                        <MenuCard key={index} item={item} />
                                    ))}
                                </div>
                            ))}
                        </TabPanel>
                    ))}
                </TabsBody>
            </Tabs>
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
