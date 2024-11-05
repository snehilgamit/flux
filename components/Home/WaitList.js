'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from '../Header'
const WaitList = ({ user, fetchUser ,tasks,fetchTasks}) => {
  return (
    <div className='w-full pb-[10rem] overflow-y-scroll'>
      <div className='text-white text-center mt-8 px-5 mb-4'>
        <h1 className='text-2xl font-bold'>Your journey to the top starts here.</h1>
        <p className='text-sm font-normal px-6 mt-2'>Compete, conquer, and claim your spot
          among the best.</p>
      </div>
      
    </div>
  )
}

export default WaitList
