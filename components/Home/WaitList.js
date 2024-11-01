'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const WaitList = ({ user }) => {
  const [tasks, setTasks] = useState(user.events)
  const [time, setTime] = useState(null)
  const setTimer = () => {
    const times = user.events.map(el => {
      const timeLeft = (Date.now() > el.start ? el.end : el.start) - Date.now()
      const type = Date.now() > el.start ? 'End' : 'Start'
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
    const interval = setInterval(() => {
      setTimer()
    }, 1000)
    return () => clearInterval(interval)
  }, [time])
  return (
    <div className='min-h-screen flex w-full itmes-center flex-col px-2'>
      <div className='text-white text-center mt-8 px-5 mb-4'>
        <h1 className='text-2xl font-bold'>Your journey to the top starts here.</h1>
        <p className='text-sm font-normal px-6 mt-2'>Compete, conquer, and claim your spot
          among the best.</p>
      </div>
      <div className='px-2'>
        {tasks.map((element, index) => (
          <div key={index} className='px-3 py-2 pb-3 rounded-xl w-full bg-[#9AF6C1] relative my-2'>
            <div className='flex justify-between'>
              <div>
                <p className='font-bold text-xl'>
                  {element.name}
                </p>
                <p className='text-xs first-letter:uppercase pr-0.5  leading-4'>
                  {element.description}.
                </p>
              </div>
              <div className='text-xs font-bold w-fit text-nowrap'>
                <p>{element.left} / {element.limit}</p>
              </div>
            </div>
            <div className='text-xs font-semibold mt-2.5'>
              {time && time[index].toString}</div>
            <div className='px-5 rounded-xl py-1.5 w-fit text-white mt-2 bottom-2 right-2 font-semibold absolute' style={{
              backgroundColor: time && time[index].toString === 'Ended' ? 'rgba(0 0 0 /50%)' : 'black',
              color: time && time[index].toString === 'Ended' ? 'rgba(255 255 255 /80%)' : 'white'
            }}>
              {time && time[index].toString === 'Ended' ? 'Ended' : 'Mint'}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WaitList
