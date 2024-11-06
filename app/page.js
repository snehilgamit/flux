'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import "animate.css"
import FlamingCircleLoader from '@/components/FlamingCircleLoader'
const colorPlate = { bg: '#191919', text: '#9AF6C1', border: '#2c3235' }
const index = () => {
  const router = useRouter()

  const checkSession = async () => {
    const WebApp = (await import('@twa-dev/sdk')).default
    WebApp.ready()
    const initData = WebApp.initData
    const { data } = await axios.post('/api/auth/session', { data: initData?initData:'query_id=AAHaxPIwAgAAANrE8jALLDTQ&user=%7B%22id%22%3A5116183770%2C%22first_name%22%3A%22FAith%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22snoxl%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1730195778&hash=82b7f5ea47b41a8b54c527745bc6f34e4688c5dc7b61d8c25d431ea8dbaff7e1' })
    const { ok, message } = data
    if (ok) {
      router.push('/home')
    } else {
      router.push('/signup')
    }
  }
  useEffect(() => {
    checkSession()
  }, [])

  const changeBg = async () => {
    const WebApp = (await import('@twa-dev/sdk')).default
    WebApp.headerColor = '#9AF6C1'
    WebApp.backgroundColor = '#191919'
}
useEffect(() => {
    if (window) {
        changeBg()
    }
}, [])
  return (
    <div className='flex justify-center items-center min-h-full flex-col w-full bg-[#191919] relative animate__animated animate__fadeIn'>
      <div className='mb-20'>
        <h1 className='uppercase text-5xl mb-16 font-extrabold text-[#9AF6C1]'>Flux</h1>
        <FlamingCircleLoader />
        {/* import { GiVibratingBall } from "react-icons/gi"; */}
      </div>
    </div>
  )
}

export default index
