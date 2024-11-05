'use client'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Menubar from '@/components/Menubar'
import Image from 'next/image'
import { HiGift } from "react-icons/hi";
import WaitList from '@/components/Home/WaitList'
import Wallet from '@/components/Home/Wallet'
import "animate.css"
import LoadingPage from '@/components/LoadingPage'
import Tasks from '@/components/Home/Tasks'
import Header from '@/components/Header'
import { error } from '@/utils/toast'
const home = () => {
    const router = useRouter()
    const [isLogined, setIsLogined] = useState(false)
    const fetching = useRef(false)
    const [user, setUser] = useState({})
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [currentTab, setCurrentTab] = useState({ current: 0, previous: 0 })
    const [tasksList, setTasksList] = useState([])

    const components = [{ component: Tasks, title: 'Tasks', header: true }, { component: WaitList, title: 'Waitlist', header: true }, { component: Wallet, header: false }]
    const CurrentComponent = components[currentTab.current].component
    const changeTab = (number) => {
        if (currentTab.current !== number) {
            setCurrentTab(prev => {
                return {
                    previous: prev,
                    current: number
                }
            })
        }
    }

    const fetchUser = async (initData) => {
        const userData = await axios.post('/api/user', { data: initData ? initData : 'query_id=AAHaxPIwAgAAANrE8jALLDTQ&user=%7B%22id%22%3A5116183770%2C%22first_name%22%3A%22FAith%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22snoxl%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1730195778&hash=82b7f5ea47b41a8b54c527745bc6f34e4688c5dc7b61d8c25d431ea8dbaff7e1' })
        const { ok, message, user } = userData.data
        if (ok) {
            setUser(user)
            if (user.referralOnboarding) {
                setTimeout(() => {
                    setShowOnboarding(true)
                }, 1400)
            }
        }else{
            error(message)
        }
    }
    const fetchTasks = async () => {
        const { data } = await axios.get('/api/claim/tasks')
        const { ok, message, tasks } = data
        if (ok) {
            setTasksList(tasks)
            if (user.referralOnboarding) {
                setTimeout(() => {
                    setShowOnboarding(true)
                }, 1400)
            }
        }else{
            error(message)
        }
    }

    const checkSession = async () => {
        fetching.current = true
        const WebApp = (await import('@twa-dev/sdk')).default
        WebApp.ready()
        const initData = WebApp.initData
        const { data } = await axios.post('/api/auth/session', { data: initData ? initData : 'query_id=AAHaxPIwAgAAANrE8jALLDTQ&user=%7B%22id%22%3A5116183770%2C%22first_name%22%3A%22FAith%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22snoxl%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1730195778&hash=82b7f5ea47b41a8b54c527745bc6f34e4688c5dc7b61d8c25d431ea8dbaff7e1' })
        const { ok, message, referralCode } = data
        if (!ok) {
            router.push('/signup')
        } else {
            await Promise.all([fetchUser(initData),fetchTasks()])
            setIsLogined(true)
        }
    }

    const close_function = () => {
        setShowOnboarding(false)
    }
    useEffect(() => {
        if (!fetching.current) {
            checkSession()
        }
    }, [])
    return (
        <>{isLogined ?
            <div className='flex min-h-screen flex-col w-full bg-[#191919] relative overflow-hidden animate__animated animate__fadeIn'>
                {components[currentTab.current].header && <Header title={components[currentTab.current].title} />}
                <CurrentComponent user={user} tasks={tasksList} fetchTasks={fetchTasks} fetchUser={fetchUser} />
                {showOnboarding ? <ReferredBy first_name={user?.referredBy?.first_name} last_name={user?.referredBy?.last_name} username={user?.referredBy?.username} close={close_function} /> : ''}
                <Menubar changeTab={changeTab} />
            </div>
            :
            <LoadingPage />
        }
        </>
    )
}

export default home
