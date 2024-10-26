import React, { useState, useEffect } from 'react';
import { Sheet } from 'react-modal-sheet';
import { image } from '../assets/image';
import CustomButton, { CustomButton2 } from '../components/CustomButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import TextInput from '../components/TextInput';

export default function Bottom({
    bottomshow,
    setBottomshow,
    paymentMethods,
    setSelectedMode,
    cartData
}) {
    const navi = useNavigate();
    const dispatch = useDispatch();
    const [billMethod, setBillMethod] = useState('');
    const [splitMethod, setSplitMethod] = useState(false);
    const [customAmount, setCustomAmount] = useState('');
    const [current, setCurrent] = React.useState(0);
    const [currentData, setCurrentData] = React.useState([]);

    const [isFullScreen, setIsFullScreen] = useState(false); // New state for full screen
    const session_id = useSelector(state => state.Reducers?.session_id);
    const table_id = useSelector(state => state.Reducers?.table_id);
    const user_id = useSelector(state => state.Reducers?.user_id);
    const fullPaymentOption = paymentMethods[0]?.data[0];
    const splitPaymentOptions = paymentMethods[1]?.data;
    const isSplitLocked = paymentMethods[1]?.locked;
    const isFullLocked = fullPaymentOption?.locked;

    const availableSplitOptions = isSplitLocked ? splitPaymentOptions?.filter(option => option?.locked) : splitPaymentOptions;
    const [selectedItems, setSelectedItems] = useState([]);

    const toggleSelectItem = (item) => {
        setSelectedItems((prevSelected) => {
            const isSelected = prevSelected.some(selectedItem => selectedItem.id === item.id);
            if (isSelected) {
                return prevSelected.filter(selectedItem => selectedItem.id !== item.id);
            } else {
                return [...prevSelected, item];
            }
        });
    };

    const calculateTotal = () => {
        return selectedItems.reduce((total, item) => total + item.price, 0);
    };

    useEffect(() => {
        setSelectedMode(isFullLocked ? fullPaymentOption : availableSplitOptions);
    }, [isFullLocked, availableSplitOptions, setSelectedMode, fullPaymentOption]);

    const handleCustomAmountChange = (e) => {
        setCustomAmount(e.target.value);
    };

    const handleCustomPayment = () => {
        const customAmountNumber = parseFloat(customAmount);
        const totalAmount = fullPaymentOption.amount;

        if (customAmountNumber > 0 && customAmountNumber <= totalAmount) {
            navi('/payment-method', {
                state: {
                    method: 'custom',
                    amount: customAmountNumber,
                    session_id: session_id,
                    user_id: user_id,
                }
            });
        } else {
            alert('Please enter a valid amount less than or equal to the total.');
        }
    };

    const resetPaymentOptions = () => {
        setBillMethod('');
        setSplitMethod(false);
        setCustomAmount('');
        setSelectedItems([])
        setCurrent(0)
        setIsFullScreen(false); // Reset full screen state
    };

    return (
        <div className='font-SUSE'>
            <Sheet
                detent={isFullScreen ? 'content-height' : 'collapsed'} // Change detent based on full screen state
                isOpen={bottomshow}
                onClose={() => {
                    setBottomshow(false);
                    setCurrent(null)
                    resetPaymentOptions();
                }}>
                <Sheet.Container className={current === 3 ? 'h-full ease-linear transition-all' : ''}>
                    <Sheet.Header />
                    <Sheet.Content className={`${current === 3 ? 'h-full ease-linear transition-all' : 'max-h-[350px]'}`}>
                        <motion.div
                            className={`bottom-0 w-screen p-4 bg-gray-100 rounded-t-3xl fixed z-50 ${current === 3 ? 'h-full ease-linear transition-all' : 'max-h-[300px]'}`}
                            initial={{ opacity: 0, scale: 0.8, y: 100 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 100, opacity: 0, scale: 0.8 }}
                            transition={{ ease: 'easeInOut', duration: 0.5 }}
                        >
                            {
                                current === 0 ?
                                    <motion.div
                                        initial={{ opacity: 0, x: -100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, ease: 'easeOut' }}
                                        className="h-full w-full flex flex-col justify-center items-center font-SUSE gap-2"
                                    >
                                        <div className="flex justify-between items-center w-full p-4">
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.2 }}
                                                className="font-medium text-xl"
                                            >
                                                Pay your bill
                                            </motion.p>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => setBottomshow(false)}
                                            >
                                                <img src={image.close} alt="close" className="h-[20px] w-[20px]" />
                                            </motion.button>
                                        </div>
                                        <>
                                            {/* FULL Payment Option */}
                                            {isFullLocked && (
                                                <motion.div
                                                    initial={{ opacity: 0, x: -50 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.3 }}
                                                    className="w-full h-full"
                                                >
                                                    <CustomButton
                                                        text="Pay full bill"
                                                        style={'scale-90 -mb-0'}
                                                        onClick={() => navi('/payment-method', {
                                                            state: {
                                                                method: fullPaymentOption.type,
                                                                amount: fullPaymentOption.amount,
                                                                session_id: session_id,
                                                                user_id: user_id,
                                                            }
                                                        })}
                                                    />
                                                </motion.div>
                                            )}

                                            {/* SPLIT Option */}
                                            {isSplitLocked && (
                                                <motion.div
                                                    initial={{ opacity: 0, x: -50 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.3 }}
                                                    className="w-full h-full"
                                                >
                                                    <CustomButton2
                                                        text="Split the bill"
                                                        style={'scale-90 -mb-0 bg-transparent border-2 border-primary'}
                                                        onClick={() => setBillMethod('split')}
                                                    />
                                                </motion.div>
                                            )}

                                            {!isSplitLocked && !isFullLocked && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 50 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.3 }}
                                                    className="w-full h-full"
                                                >
                                                    <CustomButton
                                                        text="Pay full bill"
                                                        style={'scale-90 -mb-0'}
                                                        onClick={() => navi('/payment-method', {
                                                            state: {
                                                                method: fullPaymentOption.type,
                                                                amount: fullPaymentOption.amount,
                                                                session_id: session_id,
                                                                user_id: user_id,
                                                            }
                                                        })}
                                                    />
                                                    <CustomButton2
                                                        text="Split the bill"
                                                        style={'scale-90 -mb-0 bg-transparent border-2 border-primary'}
                                                        onClick={() => setCurrent(2)}
                                                    />
                                                </motion.div>
                                            )}
                                        </>
                                    </motion.div>
                                    :
                                    null
                            }
                            {
                                current === 2 ?
                                    <motion.div
                                        initial={{ opacity: 0, x: -100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, ease: 'easeOut' }}
                                        className="w-full h-full"
                                    >
                                        <div className="flex justify-between items-center w-full font-SUSE p-4">
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => setCurrent(0)}
                                            >
                                                <img src={image.left} alt="close" className="h-[20px] w-[20px]" />
                                            </motion.button>
                                            <p className="font-medium text-xl">Split the bill</p>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => {
                                                    setBottomshow(false)
                                                    setCurrent(null)
                                                    resetPaymentOptions();
                                                }}
                                            >
                                                <img src={image.close} alt="close" className="h-[20px] w-[20px]" />
                                            </motion.button>
                                        </div>
                                        {availableSplitOptions?.map((method, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.4 }}
                                                className="w-full h-full"
                                            >
                                                <CustomButton2
                                                    text={method?.name}
                                                    style={'scale-90 -mb-0 bg-transparent border-2 border-primary'}
                                                    onClick={() => {
                                                        if (method?.type === "custom") {
                                                            setCurrent(4)
                                                            setCurrentData(method)
                                                        }
                                                        else if (method?.type === "my_items_only") {
                                                            setCurrent(3)
                                                            setCurrentData(method)
                                                        }
                                                        else if (method?.type === "split_equally") {
                                                            setCurrent(5)
                                                            setCurrentData(method)
                                                        }
                                                        else {
                                                            navi('/payment-method', {
                                                                state: {
                                                                    method: method.type,
                                                                    amount: method.amount,
                                                                    session_id: session_id,
                                                                    user_id: user_id,
                                                                }
                                                            });
                                                        }
                                                    }}
                                                />
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                    :
                                    null
                            }
                            {
                                current === 3 ?
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4 }}
                                        className="w-full h-[100dvh] flex flex-col  items-center font-SUSE"
                                    >
                                        <div className="flex justify-between items-center bg-white h-[55px] px-3 w-[100dvw]">
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => setCurrent(2)}
                                            >
                                                <img src={image.left} alt="close" className="h-[20px] w-[20px]" />
                                            </motion.button>
                                            <p className="font-medium text-lg">Pay your items only</p>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => {
                                                    setBottomshow(false)
                                                    setCurrent(null)
                                                    resetPaymentOptions();
                                                }}
                                            >
                                                <img src={image.close} alt="close" className="h-[20px] w-[20px]" />
                                            </motion.button>
                                        </div>
                                        <div className="flex items-center overflow-y-scroll flex-col px-3 w-[100dvw]">
                                            {
                                                cartData?.map((item, index) => (
                                                    <div key={index} className="w-full rounded-full items-center flex justify-between bg-white h-[65px] mt-3">
                                                        <p className=' text-lg w-[70%] px-5 font-medium font-SUSE'>{item?.name}</p>
                                                        <div className="flex w-[30%] space-x-3 items-center justify-center">
                                                            <p className="text-lg font-medium font-SUSE">{item?.price}</p>
                                                            <button
                                                                onClick={() => {
                                                                    toggleSelectItem(item)
                                                                }}
                                                                className={`h-[25px] ${selectedItems.includes(item) ? "bg-primary" : ""} flex justify-center items-center w-[25px] border rounded-full`}>
                                                                {selectedItems.includes(item) ? (
                                                                    <img src={image.tick} className='w-3 text-white h-3' alt="done" />
                                                                ) : (
                                                                    <img src={image.add} className='w-4 h-4' alt="add" />
                                                                )}
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <div className="h-[200px] w-[100dvw] flex flex-col justify-evenly items-center bg-white fixed bottom-0 px-3">
                                            <div className="flex w-[88%] justify-between items-center">
                                                <p className=' text-xl font-SUSE'>Total bill</p>
                                                <p className="font-medium font-SUSE text-xl">${calculateTotal()}</p>
                                            </div>
                                            {
                                                selectedItems.length > 0 ?
                                                    <div className="flex w-[90%] justify-between items-center">
                                                        <button
                                                            onClick={() => setCurrent(2)}
                                                            className=' bg-gray-300 text-black w-[44%] flex justify-center items-center  md:w-1/2 py-4 font-medium text-lg rounded-full font-SUSE   mb-6 md:mb-0 '>
                                                            <p>Cancle Split</p>
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setBottomshow(false)
                                                                setCurrent(null)
                                                                resetPaymentOptions();
                                                            }}
                                                            className=' bg-primary text-white w-[44%] flex justify-center items-center  md:w-1/2 py-4 font-medium text-lg rounded-full font-SUSE   mb-6 md:mb-0 '>
                                                            <p>Confirm</p>
                                                        </button>
                                                    </div>
                                                    :
                                                    <button
                                                        onClick={() => navi('/payment-method', {
                                                            state: {
                                                                method: 'my_items_only',
                                                                amount: calculateTotal(),
                                                                session_id: session_id,
                                                                user_id: user_id,
                                                            }
                                                        })}
                                                        disabled
                                                        className=' bg-gray-300 text-black w-full flex justify-center items-center  md:w-1/2 py-4 font-medium text-lg rounded-full font-SUSE   mb-6 md:mb-0 '>
                                                        <p>Confirm</p>
                                                    </button>
                                            }

                                        </div>

                                    </motion.div>
                                    :
                                    null
                            }
                            {
                                current === 4 ?
                                    <motion.div
                                        initial={{ opacity: 0, x: -100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, ease: 'easeOut' }}
                                        className="h-full w-full flex flex-col space-y-2 justify-center items-center font-SUSE gap-2"
                                    >
                                        <div className="flex justify-between items-center px-3 w-[100dvw]">
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => setCurrent(2)}
                                            >
                                                <img src={image.left} alt="close" className="h-[20px] w-[20px]" />
                                            </motion.button>
                                            <p className="font-medium text-lg"> Custom amount</p>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => {
                                                    setBottomshow(false)
                                                    setCurrent(null)
                                                    resetPaymentOptions();
                                                }}
                                            >
                                                <img src={image.close} alt="close" className="h-[20px] w-[20px]" />
                                            </motion.button>
                                        </div>
                                        <motion.div
                                            initial={{ opacity: 0, y: 50 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="w-full h-full flex flex-col space-y-4 justify-center items-center"
                                        >
                                            <input
                                                value={customAmount}
                                                onChange={handleCustomAmountChange}
                                                className="appearance-none block w-[88%] h-[55px] rounded-xl font-SUSE px-3 text-lg  leading-tight focus:outline-primary focus:border-primary"
                                                type={"number"}
                                                placeholder='Add Custom Amount'
                                            />
                                            <CustomButton2
                                                text="Confirm"
                                                style={'scale-90 w-full -mb-0 bg-transparent border-2 border-primary'}
                                                onClick={handleCustomPayment}
                                            />
                                        </motion.div>
                                    </motion.div>
                                    :
                                    null
                            }
                            {
                                current === 5 ?
                                    <motion.div
                                        initial={{ opacity: 0, x: -100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, ease: 'easeOut' }}
                                        className="h-full w-full flex flex-col space-y-2 justify-center items-center font-SUSE gap-2"
                                    >
                                        <div className="flex justify-between items-center px-3 w-[100dvw]">
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => setCurrent(2)}
                                            >
                                                <img src={image.left} alt="close" className="h-[20px] w-[20px]" />
                                            </motion.button>
                                            <p className="font-medium text-lg"> Equal Split Amount amount</p>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => {
                                                    setBottomshow(false)
                                                    setCurrent(null)
                                                    resetPaymentOptions();
                                                }}
                                            >
                                                <img src={image.close} alt="close" className="h-[20px] w-[20px]" />
                                            </motion.button>
                                        </div>
                                        <motion.div
                                            initial={{ opacity: 0, y: 50 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="w-full h-full flex flex-col space-y-4 justify-center items-center"
                                        >
                                            <div className="flex w-[88%] justify-between items-center">
                                                <p className=' text-xl font-SUSE'>Total bill</p>
                                                <p className="font-medium font-SUSE text-xl">{currentData?.amount}</p>
                                            </div>
                                            <CustomButton2
                                                text="Confirm"
                                                style={'scale-90 w-full -mb-0 bg-transparent border-2 border-primary'}
                                                onClick={() => {
                                                    navi('/payment-method', {
                                                        state: {
                                                            method: currentData.type,
                                                            amount: currentData.amount,
                                                            session_id: session_id,
                                                            user_id: user_id,
                                                        }
                                                    });
                                                }}
                                            />
                                        </motion.div>
                                    </motion.div>
                                    :
                                    null
                            }
                        </motion.div>
                    </Sheet.Content>
                </Sheet.Container>
            </Sheet>
        </div>
    );
}
