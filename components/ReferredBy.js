import React from 'react'
import "animate.css"
const ReferredBy = ({ first_name, last_name, username,close }) => {
    return (
        <div className='min-h-screen w-full flex justify-center items-center shadow-lg absolute top-0 left-0 selection:bg-none backdrop-blur z-[999] animate__animated animate__fadeIn'>
            <div className='bg-[#111111] w-[75%] h-[200px] text-white Arcade flex flex-col justify-center items-center rounded-3xl rounded-tr-none relative mb-24'>
                <div className='absolute right-0 px-4 py-1.5 rounded-3xl rounded-b-none  -top-10 bg-black text-2xl font-bold cursor-pointer animate__animated animate__fadeIn' onClick={close}>
                    X
                </div>
                <div className='text-xs animate__animated animate__fadeIn text-center'>You have been Invited by</div>
                <div className='animate__animated animate__fadeIn text-center ml-1'>
                     <span className='text-[#9AF6C1] font-bold text-lg'>{username ? username : first_name + last_name} 🎉</span>
                </div>
            </div>
        </div>
    )
}

export default ReferredBy
