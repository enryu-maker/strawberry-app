import React from 'react';
import { useDispatch } from 'react-redux';
import { addcustom, addnotes, updateQty } from '../store/actions/cartActions';
import { getCustum } from '../store/actions/sessionAction';
import CustomCard from './CustomCard';

export default function CartCard({ item }) {
    const [count, setCount] = React.useState(item?.qty);
    const [show, setShow] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [notes, setNotes] = React.useState("");
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getCustum(item?.id, setLoading, setData));
    }, [dispatch, item?.id]);

    // Calculate total customizations price
    const calculateTotalCustomizationsPrice = () => {
        return data.reduce((total, custom) => {
            const qty = item.customizations[custom.id] || 0;
            return total + (custom.price * qty);
        }, 0);
    };

    const totalCustomizationsPrice = calculateTotalCustomizationsPrice();
    const totalPrice = item.price * count + totalCustomizationsPrice;

    return (
        <>
            {show ? (
                <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-SUSE">
                    <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
                        <div className="flex items-center pb-3 border-b border-gray-300">
                            <h3 className="text-gray-800 text-xl font-bold flex-1">
                                Customize {item?.name}
                            </h3>
                            <svg
                                onClick={() => setShow(!show)}
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-3 ml-2 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500"
                                viewBox="0 0 320.591 320.591"
                            >
                                <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" />
                                <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" />
                            </svg>
                        </div>

                        <div className="my-6">
                            <p className="text-gray-600 text-sm font-semibold leading-relaxed mt-2">
                                Customize Item
                            </p>
                            <div className="flex flex-wrap justify-between items-center">
                                {data.map((custom, index) => (
                                    <CustomCard
                                        key={index}
                                        state={item}
                                        custom={custom}
                                        existingQty={item.customizations[custom.id] || 0} // Pass existing quantity
                                    />
                                ))}
                            </div>
                            <p className="text-gray-600 text-sm font-semibold leading-relaxed mt-2">
                                Notes
                            </p>
                            <textarea
                                type="text"
                                onChange={(e) => setNotes(e.target.value)}
                                className="h-[80px] border-[1px] text-start p-2 w-full outline-none rounded-md border-primary"
                            />
                        </div>

                        <div className="border-t border-gray-300 pt-6 flex justify-end gap-4">
                            <button
                                onClick={() => setShow(!show)}
                                type="button"
                                className="px-4 py-2 rounded-lg text-gray-800 text-sm border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => {
                                    dispatch(addnotes(item?.id, notes));
                                    setShow(!show);
                                }}
                                type="button"
                                className="px-4 py-2 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-primary"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
            <div className="h-[100px] w-[92%] flex justify-between font-SUSE ">
                <div className="w-[60%] flex space-x-3 ">
                    <img
                        alt="alt"
                        src={item?.image}
                        className="h-[80px] object-cover rounded-full w-[80px]"
                    />
                    <div className="w-[60%]">
                        <h2 className="font-semibold text-base flex items-center text-black">
                            {item?.name}
                        </h2>
                        <p className="text-md font-bold text-gray-500">
                            {item?.currency} {totalPrice.toFixed(2)} {/* Updated total price */}
                        </p>
                        {item?.is_customizable && (
                            <button
                                onClick={() => setShow(!show)}
                                className="bg-primary py-1 font-bold text-xs rounded-full text-white px-3"
                            >
                                Customize
                            </button>
                        )}
                    </div>
                </div>
                <div className="w-[40%] flex justify-center items-start space-x-3 ">
                    <button
                        onClick={() => {
                            if (count > 1) {
                                setCount(count - 1);
                                dispatch(updateQty(item?.id, count - 1));
                            } else {
                                dispatch({ type: 'DELETE_ITEM', payload: item?.id });
                            }
                        }}
                        className="h-[25px] w-[25px] bg-gray-300 font-bold rounded-full flex justify-center items-center"
                    >
                        -
                    </button>
                    <p className="text-md font-bold text-gray-800">{count}</p>
                    <button
                        onClick={() => {
                            setCount(count + 1);
                            dispatch(updateQty(item?.id, count + 1));
                        }}
                        className="h-[25px] w-[25px] bg-primary font-bold text-white rounded-full flex justify-center items-center"
                    >
                        +
                    </button>
                </div>
            </div>
        </>
    );
}
