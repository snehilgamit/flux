'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { HiEllipsisHorizontal, HiMiniCog6Tooth, HiMiniShare, HiPencil, HiShieldExclamation, HiXMark } from "react-icons/hi2";
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const catagory = [{ name: 'Collected', id: 'collected' }, { name: 'Offers', id: 'offers' }, { name: 'Activity', id: 'activity' }, { name: 'Favorite', id: 'favorite' }]
const Wallet = ({ user }) => {
    const [editButton, setEditButton] = useState({ profile: false, banner: false })
    const [visible, setVisible] = useState({ refer: false, option: false })
    const [filter, setFilter] = useState({ _catagory: 'collected' })
    
    const changeFilter = (type, value) => {
        if (type === '_catagory') {
            setFilter(prev => {
                return {
                    ...prev,
                    _catagory: value 
                }
            })
        }
    }

    const closeExtandDetails = (catagory) => {
        setVisible(prev => {
            return {
                ...prev,
                [catagory]: false
            }
        })
    }
    const showExtandDetails = (catagory) => {
        setVisible(prev => {
            return {
                ...prev,
                [catagory]: true
            }
        })
    }
    return (
        <div className='w-full min-h-screen pb-10 overflow-hidden'>
            <div className='w-full'>
                <div className='w-full h-[110px] bg-white/5'>
                </div>
                <div className='px-6'>
                    <div className='w-full -translate-y-9 flex justify-between items-end'>
                        <div className='w-[85px] h-[85px] bg-white rounded-full overflow-hidden relative'>
                            <Image
                                onMouseOver={() => { setEditButton(prev => { return { ...prev, profile: true } }) }}
                                onMouseOut={() => { setEditButton(prev => { return { ...prev, profile: false } }) }}
                                src={'/default_profile.png'}
                                height={85}
                                width={85}
                                alt='name'
                            />
                            {editButton.profile &&
                                <div className='absolute z-[2] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                                    <HiPencil fill='rgb(255 255 255 / 0.7)' />
                                </div>
                            }
                        </div>
                        <div className='flex gap-5 translate-y-1 translate-x-2'>
                            <div onClick={() => showExtandDetails('refer')}>
                                <HiMiniShare fill='white' size={25} />
                            </div>
                            <div onClick={() => showExtandDetails('option')}>
                                <HiEllipsisHorizontal fill='white' size={30} />
                            </div>
                        </div>

                    </div>
                    <div className='-translate-y-5 translate-x-1'>
                        <div>
                            <h1 className='text-white font-bold text-2xl'>{user?.first_name}</h1>
                            <h1 className='text-white/70 font-medium text-sm'>Joined {months[new Date(user?.createdAt).getMonth()]} {new Date(user?.createdAt).getFullYear()}</h1>
                        </div>
                    </div>
                </div>
                <div className='w-full px-6 '>
                    <div className='font-semibold overflow-scroll no-scrollbar border-b-2 border-[#2c3235] pb-6' >
                        <div className='flex gap-2 text-sm mr-2'>
                            {catagory.map((element, index) => (
                                <div key={index} className='p-2 px-4 rounded-3xl' onClick={() => { changeFilter('_catagory', element.id) }} style={{ backgroundColor: filter._catagory === element.id ? '#9AF6C1' : 'rgb(255 255 255 / 0.2)', color: filter._catagory === element.id ? 'black' : 'white' }}>
                                    <p>{element.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='w-full px-6 h-[20vh] flex justify-center items-center'>
                <p className='text-white text-xl font-semibold'>
                    No items to display
                </p>
                </div>
            </div>
            <ExtandDetails visible={visible.refer} close={closeExtandDetails} name={'refer'}>
                <div className=''>
                    <div className='flex justify-center items-center flex-col w-full'>
                        <h1 className='text-xl font-bold'>
                            Invite your frens
                        </h1>
                        <div className='flex gap-2 w-fit px-4 py-1.5 justify-center items-center bg-[#9AF6C1] rounded-3xl mt-3'>
                            <p className='text-sm font-semibold'>Invite</p>
                            <HiMiniShare />
                        </div>
                    </div>
                </div>
            </ExtandDetails>
            <ExtandDetails visible={visible.option} close={closeExtandDetails} name={'option'}>
                <div className='w-full'>
                    <div className='px-4'>
                        <div className=''>
                            <h1 className='font-semibold text-xl'>More</h1>
                            <div className='flex gap-5 font-medium items-center py-1 mt-1.5'>
                                <div>
                                    <HiMiniCog6Tooth size={25} />
                                </div>
                                <p>Settings</p>
                            </div>
                            <div className='flex gap-5 font-medium items-center py-1'>
                                <div>
                                    <HiShieldExclamation size={25} />
                                </div>
                                <p>Report</p>
                            </div>
                        </div>
                    </div>
                </div>
            </ExtandDetails>
        </div>
    )
}

export default Wallet



const ExtandDetails = ({ children, visible, close, name }) => {
    return (
        <div className='w-full backdrop-blur-sm min-h-screen absolute  top-0 left-0 flex justify-center items-center' style={{ display: visible ? '' : 'none' }}>
            <div className='bg-white p-4 py-8 w-[70%] rounded-xl mb-20 flex itmes-center justify-center relative'>
                <div className=' absolute top-1.5 right-2' onClick={() => close(name)}>
                    <HiXMark size={23} />
                </div>
                {children}
            </div>
        </div>
    )
}