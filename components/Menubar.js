import React, { useState } from 'react'
import { LuUser } from "react-icons/lu";
import { HiFire, HiTrophy, HiHome, HiWallet ,HiSquares2X2, HiRocketLaunch} from "react-icons/hi2";

const Menubar = ({ changeTab }) => {
    const [activeTab, setActiveTab] = useState(0)
    return (
        <div className='w-full absolute bottom-0 uppercase text-[0.55rem] shadow-xl bg-[#7d7d7d1f]'>
            <div className='flex  items-center justify-center gap-20 border-[#2c3235] border-t-2 py-7 pt-1 px-3 pl-5 max-[320px]:px-2 font-semibold border-b-0 border-x-0'>
                <div className='flex items-center flex-col transition-all duration-500 ease-in-out gap-0.5 cursor-pointer' style={{ color: activeTab == 0 ? '#9AF6C1' : 'white' }} onClick={() => {changeTab(0);setActiveTab(0)}}>
                    <div className='p-1.5 rounded-lg' style={{backgroundColor:activeTab ===0?'rgb(0 0 0 / 0.05)':'transparent'}}>
                        <HiFire className='transition-all duration-700 active:scale-125' style={{ fill: activeTab == 0 ? '#9AF6C1' : 'white' }} size={'30px'} />
                    </div>
                    Tasks
                </div>
                
                <div className='flex items-center flex-col transition-all duration-500 ease-in-out gap-0.5 cursor-pointer' style={{ color: activeTab == 1 ? '#9AF6C1' : 'white' }} onClick={() => {changeTab(1);setActiveTab(1)}}>
                    <div className='p-1.5 rounded-lg' style={{backgroundColor:activeTab ===1?'rgb(0 0 0 / 0.05)':'transparent'}}>
                        <HiRocketLaunch className='transition-all duration-700 active:scale-125' style={{ fill: activeTab == 1 ? '#9AF6C1' : 'white' }}  size={'30px'} />
                    </div>
                    Early
                </div>

                <div className='flex items-center flex-col transition-all duration-500 ease-in-out gap-0.5 cursor-pointer' style={{ color: activeTab == 2 ? '#9AF6C1' : 'white' }} onClick={() => {changeTab(2);setActiveTab(2)}}>
                    <div className='p-1.5 rounded-lg' style={{backgroundColor:activeTab ==2?'rgb(0 0 0 / 0.05)':'transparent'}}>
                        <HiWallet className='transition-all duration-700 active:scale-125' style={{ fill: activeTab == 2 ? '#9AF6C1' : 'white' }} size={'30px'} />
                    </div>
                    Wallet
                </div>

            </div>
        </div>
    )
}

export default Menubar;




{/* <div className='w-full absolute bottom-0  uppercase mb-10 px-6 text-[0.6rem]'>
            <div className='flex justify-around items-center gap-2 overflow-hidden font-bold border-2 border-black/50 rounded-3xl px-4'>
                <div className='w-[30%] flex items-center flex-col py-4 px-3 active:scale-110 transition-all duration-100'>
                    <div className='w-full h-[30px] flex justify-center items-center mb-0.5'>
                        <GoHomeFill size={'30px'} />
                    </div>
                    Home
                </div>
                <div className='w-[30%] flex items-center flex-col py-4 px-3 active:scale-110 transition-all duration-100'>
                    <div className='w-full h-[30px] flex justify-center items-center mb-0.5'>
                        <LuUser style={{ fill: "black" }} size={'30px'} />
                    </div>
                    Refer
                </div>
                <div className='w-[34%] flex items-center flex-col py-4 px-3 active:scale-110 transition-all duration-100'>
                    <div className='w-full h-[30px] flex justify-center items-center mb-0.5'>
                        <IoIosTrophy size={'30px'} />
                    </div>
                    Leaderboard
                </div>
            </div>
        </div> */}

// <div className='w-full absolute bottom-0 uppercase pb-4 text-[0.6rem]'>
//     <div className='flex justify-around items-center gap-2 overflow-hidden font-bold border-black w-full border-t-4 px-7'>
//         <div className='w-[30%] flex items-center flex-col py-4 px-3 active:scale-110 transition-all duration-100'>
//             <div className='w-full h-[30px] flex justify-center items-center mb-0.5'>
//                 <GoHomeFill size={'30px'} />
//             </div>
//             Home
//         </div>
//         <div className='w-[30%] flex items-center flex-col py-4 px-3 active:scale-110 transition-all duration-100'>
//             <div className='w-full h-[30px] flex justify-center items-center mb-0.5'>
//                 <LuUser style={{ fill: "black" }} size={'30px'} />
//             </div>
//             Refer
//         </div>
//         <div className='w-[34%] flex items-center flex-col py-4 px-3 active:scale-110 transition-all duration-100'>
//             <div className='w-full h-[30px] flex justify-center items-center mb-0.5'>
//                 <IoIosTrophy size={'30px'} />
//             </div>
//             Leaderboard
//         </div>
//     </div>
// </div>