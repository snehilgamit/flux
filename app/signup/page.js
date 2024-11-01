'use client'
import React, { useEffect, useState } from 'react'
import "animate.css"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Toaster } from 'react-hot-toast'
import FlamingCircleLoader from '@/components/FlamingCircleLoader'
import { FcOk,FcBullish,FcVip,FcRating,FcConferenceCall} from "react-icons/fc";
import { error, success } from '@/utils/toast'

const colorPlate = { bg: '#191919', text: '#9AF6C1', border: '#2c3235' }
const Signup = () => {
    const router = useRouter()
    const btnTxt = ['Start', 'Next', 'Next', 'Enter']
    const [message, setMessage] = useState('')
    const about = [
        {
            "section": "Joining the Flux Marketplace",
            "description": "To get started, users must connect their compatible Solana wallet to the Flux marketplace.",
            "purpose": "Flux serves as an interactive platform where NFT collectors, creators, and investors can explore, buy, sell, and trade digital assets seamlessly.",
            "icon":<FcOk size={18}/>
        },
        {
            "section": "Exclusive NFT Drops",
            "description": "Flux offers exclusive NFT drops with unique, limited-edition assets.",
            "examples": [
                "Participating in timed sales",
                "Receiving exclusive invites to rare drops",
                "Collecting Flux-original NFTs"
            ],
            "goal": "To build a vibrant community of NFT enthusiasts and collectors by offering exclusive access and early adoption incentives.",
            "icon":<FcBullish size={18}/>
        },
        {
            "section": "Earning $FLUX Tokens",
            "description": "Active participants earn $FLUX tokens as rewards for engagement and contributions.",
            "useCases": [
                "Store $FLUX in a compatible wallet",
                "Use tokens for marketplace discounts or rare NFT drops",
                "Trade $FLUX on Solana decentralized exchanges"
            ],
            "icon":<FcVip size={18}/>
        },
        {
            "section": "Gamified NFT Trading Experience",
            "description": "Flux offers a gamified experience with leaderboards, trading achievements, and bonus rewards for active users.",
            "features": [
                "Track portfolio growth",
                "Monitor NFT trading achievements",
                "View token rewards and exclusive offers"
            ],
            "access": "Available directly on the Flux platform, accessible via both desktop and mobile.",
            "icon":<FcRating size={18}/>
        },
        {
            "section": "Community Governance",
            "description": "Holders of $FLUX tokens can participate in governance decisions.",
            "purpose": "Empower $FLUX token holders to vote on marketplace updates, new features, and the future direction of the Flux ecosystem.",
            "icon":<FcConferenceCall size={18}/>
        }
    ];


    const [slide, setSlide] = useState(0);
    const slideChanger = () => {
        slide < 3 ? setSlide(prev => prev + 1) : signUp()
    }

    const signUp = async () => {
        const WebApp = (await import('@twa-dev/sdk')).default
        WebApp.ready()
        const initData = WebApp.initData
        const { data } = await axios.post('/api/auth/signup', { data: initData? initData:'query_id=AAHaxPIwAgAAANrE8jALLDTQ&user=%7B%22id%22%3A5116183770%2C%22first_name%22%3A%22FAith%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22snoxl%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1730195778&hash=82b7f5ea47b41a8b54c527745bc6f34e4688c5dc7b61d8c25d431ea8dbaff7e1' })
        const { ok, message } = data
        if (ok) {
            success('Fluxed!')
            router.push('/home')
        } else {
            error(message)
            if (message === 'Account exist') {
                router.push('/home')
            }
        }
    }

    return (
        <>
            <Toaster />
            <div className='flex justify-center items-center max-h-screen w-full bg-[#191919] relative overflow-hidden selection:bg-none'>
                <div className='w-full h-full overflow-hidden'>
                    <div className='h-full flex transition-all duration-500 text-white font-semibold' style={{ transform: `translateX(-${slide * 100}%)` }}>
                        <div className='flex justify-center items-center flex-col animate__animated animate__fadeIn min-w-[100%] mb-28'>
                            <h1 className='uppercase text-5xl text-[#9AF6C1] font-bold mb-16'>Flux</h1>
                            <FlamingCircleLoader />
                        </div>
                        <div className='min-h-[90vh] flex flex-col animate__animated animate__fadeIn min-w-[100%]'>

                            <h1 className='uppercase px-5 text-lg pt-10 font-semibold flex gap-1 items-start'>
                                <div className='w-[30px] h-[30px] mt-1'>
                                    <FcOk size={18} />
                                </div>
                                <p>
                                    Flux is a Solana NFT marketplace focused on decentralized rewards, where users earn tokens by completing tasks and engaging with the community.
                                </p>
                            </h1>
                        </div>
                        <div className='flex min-h-screen pt-6 flex-col animate__animated animate__fadeIn min-w-[100%] p-6 gap-4 pb-10'>
                            {about.map((el, index) => (
                                <div className='flex gap-1 rounded-lg p-1' key={index}>
                                    <div className='w-[25px] h-[25px] p-1 pt-0.5'>
                                        {el.icon}
                                    </div>
                                    <div>
                                        <h1 className='font-semibold uppercase'>{el.section}</h1>
                                        <h1 className='font-normal text-[0.69rem]'>{el.description}</h1>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='flex justify-center items-center flex-col animate__animated animate__fadeIn min-w-[100%]'>
                            <h1 className='uppercase text-2xl mb-24 font-normal'>Enter the <span className='text-[#9AF6C1] font-bold'>Flux</span></h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className='absolute bottom-14 right-1/2 translate-x-1/2 Arcade'>
                <div className='px-10 pb-3 py-2.5 text-xl bg-[#9AF6C1] rounded-xl text-black font-bold cursor-pointer' onClick={slideChanger}>
                    {btnTxt[slide]}
                </div>
            </div>
        </>
    )
}

export default Signup;
