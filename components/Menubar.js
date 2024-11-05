import React, { useState } from 'react'
import { LuUser } from "react-icons/lu";
import { HiFire, HiTrophy, HiHome, HiWallet ,HiSquares2X2, HiRocketLaunch} from "react-icons/hi2";

const Menubar = ({ changeTab }) => {
    const [activeTab, setActiveTab] = useState(0)
    return (
        <main className='flex flex-col mt-0 w-full border-t-1 border-white/20 border-t bg-[#191919] fixed bottom-0'>
            <div className='flex overflow-hidden gap-10 justify-between items-center px-6 pt-3 pb-1 w-full text-xs leading-snug text-center whitespace-nowrap'>
                <div className='flex flex-grow justify-start flex-col items-center transition-all duration-500 ease-in-out gap-0.5 cursor-pointer' style={{ color: activeTab == 0 ? '#9AF6C1' : 'white' }} onClick={() => {changeTab(0);setActiveTab(0)}}>
                    <div className='p-1.5 rounded-lg' style={{backgroundColor:activeTab ===0?'rgb(0 0 0 / 0.05)':'transparent'}}>
                        <HiFire className='transition-all duration-700 active:scale-125' style={{ fill: activeTab == 0 ? '#9AF6C1' : 'white' }} size={'30px'} />
                    </div>
                    Tasks
                </div>
                
                <div className='flex flex-grow justify-start flex-col items-center transition-all duration-500 ease-in-out gap-0.5 cursor-pointer' style={{ color: activeTab == 1 ? '#9AF6C1' : 'white' }} onClick={() => {changeTab(1);setActiveTab(1)}}>
                    <div className='p-1.5 rounded-lg' style={{backgroundColor:activeTab ===1?'rgb(0 0 0 / 0.05)':'transparent'}}>
                        <HiRocketLaunch className='transition-all duration-700 active:scale-125' style={{ fill: activeTab == 1 ? '#9AF6C1' : 'white' }}  size={'30px'} />
                    </div>
                    Early
                </div>

                <div className='flex flex-grow justify-start flex-col items-center transition-all duration-500 ease-in-out gap-0.5 cursor-pointer' style={{ color: activeTab == 2 ? '#9AF6C1' : 'white' }} onClick={() => {changeTab(2);setActiveTab(2)}}>
                    <div className='p-1.5 rounded-lg' style={{backgroundColor:activeTab ==2?'rgb(0 0 0 / 0.05)':'transparent'}}>
                        <HiWallet className='transition-all duration-700 active:scale-125' style={{ fill: activeTab == 2 ? '#9AF6C1' : 'white' }} size={'30px'} />
                    </div>
                    Wallet
                </div>

            </div>
        </main>
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