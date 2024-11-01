'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const WaitList = ({ user }) => {
  return (
    <div className='min-h-screen flex w-full itmes-center flex-col px-2'>
      <div className='text-white text-center mt-8 px-5 mb-4'>
        <h1 className='text-2xl font-bold'>Your journey to the top starts here.</h1>
        <p className='text-sm font-normal px-6 mt-2'>Compete, conquer, and claim your spot
          among the best.</p>
      </div>
      
    </div>
  )
}

export default WaitList
