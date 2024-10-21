import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { image } from '../../../assets/image';
import CustomButton from '../../../components/CustomButton';
import { CustomButton2 } from '../../../components/CustomButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function BottomOptions({ isOpen, setIsopen, paymentMethods, setSelectedMode }) {
    const navi = useNavigate();
    const dispatch = useDispatch();
    const [billMethod, setBillMethod] = useState(''); // Track which option is selected
    const [splitMethod, setSplitMethod] = useState(false); // Track if Custom split method is selected
    const [customAmount, setCustomAmount] = useState(''); // Track custom amount input
    const [loading, setLoading] = useState(false); // State to handle loading

    const session_id = useSelector(state => state.Reducers.session_id);
    const table_id = useSelector(state => state.Reducers.table_id);
    const user_id = useSelector(state => state.Reducers.user_id);

    // Extract full payment and split payment options
    const fullPaymentOption = paymentMethods[0].data[0]; // Full Payment
    const splitPaymentOptions = paymentMethods[1].data;  // Split Payment methods
    const isSplitLocked = paymentMethods[1].locked;      // Split category lock status
    const isFullLocked = fullPaymentOption.locked;       // Full category lock status

    // Filter split options where locked is false
    const availableSplitOptions = splitPaymentOptions.filter(option => !option.locked);

    React.useEffect(() => {
        setSelectedMode(isFullLocked ? fullPaymentOption : availableSplitOptions);
    }, []);

    // Function to handle custom amount input change
    const handleCustomAmountChange = (e) => {
        setCustomAmount(e.target.value);
    };

    // Function to handle navigation for custom amount payment
    const handleCustomPayment = () => {
        const customAmountNumber = parseFloat(customAmount); // Convert input to a number
        const totalAmount = fullPaymentOption.amount;
        const remainingAmount = totalAmount - customAmountNumber; // Subtract the custom amount from total

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

    return (
        <AnimatePresence mode="wait">
            {isOpen ? (
                <>
                    {/* Main Bottom Options Panel */}
                    <motion.div
                        key="sidebar"
                        className="bottom-0 min-h-[250px] max-h-[300px] w-screen mb-0 p-4 bg-gray-100 
                        rounded-t-3xl fixed z-50"
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{
                            y: 100,
                            opacity: 0.3
                        }}
                        transition={{
                            ease: 'easeOut',
                            duration: 0.3
                        }}
                    >
                        <div className="flex justify-between w-full p-4">
                            <p className="font-medium text-xl">Pay Your Bill</p>
                            <button onClick={() => setIsopen(false)}>
                                <img
                                    src={image.close}
                                    alt="close"
                                    className="h-[20px] w-[20px]"
                                />
                            </button>
                        </div>

                        <div className="h-full w-full flex flex-col justify-center items-center gap-2">
                            {!billMethod && (
                                <>
                                    {/* FULL Payment Option */}
                                    {!isFullLocked && (
                                        <div className="w-full h-full">
                                            <CustomButton
                                                text="Full Payment"
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
                                        </div>
                                    )}

                                    {/* SPLIT Option */}
                                    {availableSplitOptions.length > 0 && (
                                        <div className="w-full h-full">
                                            <CustomButton2
                                                text="Split Bill"
                                                style={'scale-90 -mb-0 bg-transparent border-2 border-primary'}
                                                onClick={() => setBillMethod('split')}
                                            />
                                        </div>
                                    )}
                                </>
                            )}

                            {/* SPLIT Options Section */}

                            {
                                splitMethod ?
                                    (
                                        <div className="w-full h-full flex flex-col justify-center items-center">
                                            <input
                                                type="number"
                                                value={customAmount}
                                                onChange={handleCustomAmountChange}
                                                placeholder="Enter custom amount"
                                                className="py-3 px-6 border-2 border-primary rounded-full w-[88%]"
                                            />
                                            <CustomButton2
                                                text="Submit Custom Payment"
                                                style={'scale-90 mt-2'}
                                                onClick={handleCustomPayment} // Handle custom amount submission
                                            />
                                        </div>
                                    )
                                    :
                                    billMethod === 'split' && (
                                        <div className="w-full h-full">
                                            {availableSplitOptions.map((method) => (
                                                <div key={method?.type} className="w-full h-full">
                                                    <CustomButton2
                                                        text={method?.name === "Custom" ? method?.name : method?.name + ' €' + method?.amount}
                                                        style={'scale-90 -mb-0 bg-transparent border-2 border-primary'}
                                                        onClick={() => {
                                                            if (method?.name === "Custom") {
                                                                setSplitMethod(true); // Show input for custom amount
                                                            } else {
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
                                                </div>
                                            ))}
                                        </div>
                                    )}
                        </div>
                    </motion.div>
                </>
            ) : null}
        </AnimatePresence>
    );
}
