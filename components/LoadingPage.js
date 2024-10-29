import React from 'react'
import FlamingCircleLoader from './FlamingCircleLoader'
const LoadingPage = () => {
    return (
        <div className='flex justify-center items-center min-h-screen flex-col w-full bg-[#191919] relative overflow-hidden animate__animated animate__fadeIn'>
      <div className='mb-20'>
        <h1 className='uppercase text-5xl mb-16 font-extrabold text-[#9AF6C1]'>Flux</h1>
        <FlamingCircleLoader />
        {/* import { GiVibratingBall } from "react-icons/gi"; */}
      </div>
    </div>
    )
}

export default LoadingPage
