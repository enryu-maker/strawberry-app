import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { image } from "../../../Assets/Image";
import { useRef } from "react";
export default function SideNav({ isOpen, setIsopen }) {
  const ref = useRef(null);
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          ref={ref}
          key="sidebar"
          className="top-0 bottom-0 left-0 h-screen w-[250px] p-4 bg-white absolute z-50"
          initial={{ opacity: 0, x: -100 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{
            x: -100,
            opacity: 0.7,
            transition: { ease: "easeInOut", duration: 0.5 },
          }}
          transition={{
            ease: "easeInOut",
            duration: 0.5,
          }}
        >
          <div className="h-full w-full flex flex-col justify-between items-center">
            <div className="h-[45vh] w-[100%] flex flex-col justify-between items-center">
              <div className="flex w-full justify-between items-center">
                <p className="text-2xl flex font-medium items-center space-x-2 font-Poppins">
                  <img
                    src={image.logo}
                    alt="logo"
                    className="h-[25px] w-[25px]"
                  />
                  Strawberry
                </p>
                <button onClick={() => setIsopen(false)} className="">
                  <img
                    src={image.close}
                    alt="close"
                    className="h-[20px] w-[20px]"
                  />
                </button>
              </div>

              <div className="flex flex-col justify-center items-center space-y-2">
                <img
                  src={image.sample}
                  alt="icon"
                  className="h-[100px] w-[100px] rounded-full relative shadow-md self-center"
                />
                <p className="text-base self-center uppercase text-black font-Poppins font-semibold">
                  Up town (U.S)
                </p>
                <img
                  src={image.instagram}
                  alt="insta"
                  className="h-[20px] w-[20px]"
                />
              </div>
              <div className="w-full space-y-3">
                <div className="flex justify-between items-center w-full">
                  <div className="flex space-x-4 items-center">
                    <img
                      src={image.www}
                      alt="www"
                      className="h-[16px] w-[16px]"
                    />
                    <p className="text-sm self-center uppercase text-black font-Poppins">
                      Visit our website
                    </p>
                  </div>
                  <img
                    src={image.right}
                    alt="right"
                    className="h-[12px] w-[12px]"
                  />
                </div>
                <div className="flex justify-between items-center w-full">
                  <div className="flex space-x-4 items-center">
                    <img
                      src={image.email}
                      alt="email"
                      className="h-[16px] w-[16px]"
                    />
                    <p className="text-sm self-center uppercase text-black font-Poppins">
                      receive the latest news from uptown (us)
                    </p>
                  </div>
                  <img
                    src={image.right}
                    alt="right"
                    className="h-[12px] w-[12px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
