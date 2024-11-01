'use client'
import { error, success } from '@/utils/toast'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import nacl from 'tweetnacl'
import bs58 from "bs58";
import { useRouter } from 'next/navigation'
const Tasks = ({ user }) => {
  const router = useRouter()
  const [connected, setConnected] = useState(false);
  const [User, setUser] = useState(user)
  const [tasks, setTasks] = useState(user.events)
  const [data, setData] = useState('')
  const [time, setTime] = useState(null)
  const [keyPair, setkeyPair] = useState()
  const loading = useRef(true)
  const setTimer = () => {
    const times = user.events.map(el => {
      const timeLeft = (Date.now() > el.start ? el.end : el.start) - Date.now()
      const type = Date.now() > el.start ? 'Ends' : 'Starts'
      if (timeLeft < 0) {
        return {
          toString: "Ended"
        }
      }
      const days = Math.floor(timeLeft / (24 * 60 * 60 * 1000));
      const hours = Math.floor((timeLeft / (60 * 60 * 1000)) % 24);
      const minutes = Math.floor((timeLeft / (60 * 1000)) % 60);
      const seconds = Math.floor((timeLeft / 1000) % 60);
      return {
        toString: type + ' in ' + days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's'
      }
    })
    setTime(times)
  }
  useEffect(() => {
    setTimer()
  }, [user])
  useEffect(() => {
    const interval = setInterval(setTimer, 1000)
    return () => clearInterval(interval)
  }, [time])

  const claim = async (link) => {
    const message = `Sign this message to verify this wallet is belong to you.\nPublic Key : ${publicKey}\n`
    const messageBytes = new TextEncoder().encode(message)
    const toastID = toast.loading('Minting')
    try {
      const signedMessage = await signMessage?.(messageBytes)
      const signedMessageBase64 = Buffer.from(signedMessage).toString("base64");
      const WebApp = (await import('@twa-dev/sdk')).default
      WebApp.ready()
      const initData = WebApp.initData
      const { data } = await axios.post(link, { data: initData ? initData : 'query_id=AAHaxPIwAgAAANrE8jALLDTQ&user=%7B%22id%22%3A5116183770%2C%22first_name%22%3A%22FAith%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22snoxl%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1730195778&hash=82b7f5ea47b41a8b54c527745bc6f34e4688c5dc7b61d8c25d431ea8dbaff7e1', payload: { signed_message: signedMessageBase64, public_key: publicKey.toBase58(), message } })

      toast.dismiss(toastID)
      if (data.ok) {
        success(data.message)
        setUser(prev => ({ ...prev, early_bird: true }))
      } else {
        error(data.message)
      }
    } catch (err) {
      disconnect()
      toast.dismiss(toastID)
      // error('Error while minting. try again.')
      console.error("Error signing message:", err);
    }
  }
  const connectWallet = async () => {
    const WebApp = (await import('@twa-dev/sdk')).default
    const newKeyPair = nacl.box.keyPair()
    setkeyPair(newKeyPair)
    const public_key = bs58.encode(newKeyPair.publicKey)
    const secret_key = bs58.encode(newKeyPair.secretKey)
    window.localStorage.setItem('phantom_link', JSON.stringify({ public_key, secret_key }))
    const redirect_link = 'https://t.me/punksceo_bot/join?startapp='
    WebApp.openLink(`https://phantom.app/ul/v1/connect?app_url=https://flux-green-theta.vercel.app&dapp_encryption_public_key=${public_key}&redirect_link=${redirect_link}`)
  }

  useEffect(() => {
    const handleResponse = async () => {
      loading.current = false
      const WebApp = (await import('@twa-dev/sdk')).default
      const data = WebApp.initData
      const userData = Object.fromEntries(new URLSearchParams(data));
      await axios.post('/api/auth/store', { data })
    }
    if (loading.current) {
      handleResponse()
    }
  }, [])
  return (
    <div>
      <Toaster />
      <div className='text-white px-4 py-4 mb-4 font-bold text-2xl pb-0 flex justify-between'>
        <p>Task</p>
        <div className='px-3 py-1.5 cursor-pointer' onClick={connectWallet} style={{
          backgroundColor: 'black',
          color: '#9AF6C1',
          borderRadius: '20px',
          fontSize: '15px'
        }} >{!connected && 'Connect wallet'}</div>
      </div>

      <div className='px-4'>
        {tasks.map((element, index) => (
          <div key={index} className='px-3.5 py-3 rounded-2xl w-full bg-[#2c3235]/30 text-white border border-[#2c3235] relative my-2'>
            <div className='flex justify-between'>
              <div>
                <p className='font-bold text-xl text-white'>
                  {element.name}
                </p>
                <p className='text-xs first-letter:uppercase pr-2 text-white/70 leading-4'>
                  {element.description}.
                </p>
              </div>
              <div className='text-xs font-bold w-fit text-nowrap'>
                <p><span className='text-[#9AF6C1] text-base'>{element.left}</span> / {element.limit}</p>
              </div>
            </div>
            <div className='text-xs font-semibold mt-10 mb-0.5'>
              {time && time[index].toString}</div>
            {User.early_bird ? <div className='px-5 rounded-xl py-1.5 w-fit  mt-2 bottom-2 right-2 font-bold absolute hover:scale-105 transition-all duration-500  ease-in-out cursor-pointer' style={{
              backgroundColor: time && time[index].toString === 'Ended' ? 'rgba(0 0 0 /50%)' : 'black',
              color: time && time[index].toString === 'Ended' ? 'rgba(154 246 193 /80%)' : '#9AF6C1'
            }}>
              You Fluxed
            </div>
              :
              <>
                <div className='px-5 rounded-xl py-1.5 w-fit  mt-2 bottom-2 right-2 font-bold absolute hover:scale-105 transition-all duration-500  ease-in-out cursor-pointer' style={{
                  backgroundColor: time && time[index].toString === 'Ended' ? 'rgba(0 0 0 /50%)' : 'black',
                  color: time && time[index].toString === 'Ended' ? 'rgba(154 246 193 /80%)' : '#9AF6C1'
                }} onClick={() => claim(element.api)}>
                  {time && time[index].toString === 'Ended' ? 'Ended' : 'Mint'}
                </div>
              </>
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tasks
