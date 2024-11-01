'use client'
import React, { useEffect, useState } from 'react'
const Tasks = ({user}) => {
  const [tasks, setTasks] = useState(user.events)
  const [time, setTime] = useState(null)
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
    const interval = setInterval(() => {
      setTimer()
    }, 1000)
    return () => clearInterval(interval)
  }, [time])
  return (
    <div>
      <div className='text-white px-4 py-2 font-bold text-2xl pb-0'>
        Tasks
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
            <div className='px-5 rounded-xl py-1.5 w-fit  mt-2 bottom-2 right-2 font-bold absolute focus:scale-110 transition-all duration-500  ease-in-out cursor-pointer' style={{
              backgroundColor: time && time[index].toString === 'Ended' ? 'rgba(0 0 0 /50%)' : 'black',
              color: time && time[index].toString === 'Ended' ? 'rgba(154 246 193 /80%)' : '#9AF6C1'
            }}>
              {time && time[index].toString === 'Ended' ? 'Ended' : 'Mint'}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tasks
