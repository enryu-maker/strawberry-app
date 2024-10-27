import React from 'react';
import { useDispatch } from 'react-redux';
import { addcustom } from '../store/actions/cartActions';

export default function CustomCard({ state, custom, existingQty }) {
    const [count1, setCount1] = React.useState(existingQty);
    const dispatch = useDispatch();

    return (
        <div className="w-full md:w-1/2">
            <div className="flex items-center justify-between py-2 border-b border-gray-300">
                <p className="text-gray-800 text-sm font-bold leading-relaxed">
                    {custom?.name}
                </p>
                <div className="w-[40%] flex justify-center items-start space-x-3 ">
                    <p className="text-gray-600 text-sm font-semibold leading-relaxed">
                        {state?.currency} {custom?.price}
                    </p>
                    <button
                        onClick={() => {
                            if (count1 > 0) {
                                setCount1(count1 - 1);
                                dispatch(addcustom(state?.id, custom?.id, count1 - 1));
                            } else {
                                dispatch({ type: 'DELETE_CUSTOM', payload: custom?.id });
                            }
                        }}
                        className="h-[25px] w-[25px] bg-gray-300 font-bold rounded-full flex justify-center items-center"
                    >
                        -
                    </button>
                    <p className="text-md font-bold text-gray-800">{count1}</p>
                    <button
                        onClick={() => {
                            setCount1(count1 + 1);
                            dispatch(addcustom(state?.id, custom?.id, count1 + 1));
                        }}
                        className="h-[25px] w-[25px] bg-primary font-bold text-white rounded-full flex justify-center items-center"
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
}
