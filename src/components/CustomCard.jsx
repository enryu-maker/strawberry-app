import React from 'react'

export default function CustomCard({ item, setExtra }) {
    const [count, setCount] = React.useState(0)

    return (
        <div className="flex justify-between items-center w-full h-[30px] font-SUSE">
            <h1 className="font-semibold ">{item.name}</h1>
            <h1 className=" w-[15%] font-SUSE  text-primary text-sm font-bold">
                € {item.price * count}
            </h1>
            <div className="w-[50%] flex justify-center items-cnter space-x-3 ">
                <button
                    onClick={() => {
                        if (count > 0) {
                            setExtra(item.price * (count - 1))
                            setCount(count - 1)
                        }
                    }}
                    className="h-[20px] w-[20px] bg-gray-300 font-bold rounded-full flex justify-center items-center "
                >
                    -
                </button>
                <p className="text-md font-bold text-center text-gray-800">
                    {count * item?.quantity} {''} {item?.unit}
                </p>
                <button
                    onClick={() => {
                        setExtra(item.price * (count + 1))
                        setCount(count + 1)
                    }}
                    className="h-[20px] w-[20px] bg-primary font-bold text-white rounded-full flex justify-center items-center"
                >
                    +
                </button>
            </div>
        </div>
    )
}
