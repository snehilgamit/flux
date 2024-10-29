'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import "animate.css"
import FlamingCircleLoader from '@/components/FlamingCircleLoader'
const colorPlate = {bg:'#191919',text:'#9AF6C1',border:'#2c3235'}
const index = () => {
  const router = useRouter()

  const checkSession = async () => {
    const WebApp = (await import('@twa-dev/sdk')).default
    WebApp.ready()
    const initData = WebApp.initData
    const { data } = await axios.post('/api/auth/session', { data: initData })
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
  return (
    <div className='flex justify-center items-center min-h-screen flex-col w-full bg-[#191919] relative overflow-hidden animate__animated animate__fadeIn'>
    <div className='mb-20'>
      <h1 className='uppercase text-5xl mb-16 font-extrabold text-[#9AF6C1]'>Flux</h1>
      <FlamingCircleLoader/>
      import { GiVibratingBall } from "react-icons/gi";
    </div>
    </div>
  )
}

export default index
