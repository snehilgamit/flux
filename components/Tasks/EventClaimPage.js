import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { error, success } from "@/utils/toast";
const EventClaimPage = ({ data }) => {
    const { tasks, completed_tasks } = data
    const checkTask = async (link, uuid, href) => {
        window.open(href)
        const WebApp = (await import('@twa-dev/sdk')).default
        WebApp.ready()
        const initData = WebApp.initData
        const { data } = await axios.post(link, { data: initData || 'query_id=AAHaxPIwAgAAANrE8jALLDTQ&user=%7B%22id%22%3A5116183770%2C%22first_name%22%3A%22FAith%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22snoxl%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1730195778&hash=82b7f5ea47b41a8b54c527745bc6f34e4688c5dc7b61d8c25d431ea8dbaff7e1', uuid })
        if (data.ok) {
            completed_tasks[uuid] = uuid
            success(data.message)
        }
        else {
            error(data.message);
        }
    }
    return (
        <>
            <div className="text-white">
                <div className="flex flex-col gap-2 mt-5">
                    {tasks.map((el, index) => (
                        <div key={index} className=' border  border-[rgba(255,255,255,0.2)] text-white bg-opacity-70 rounded-2xl p-1.5 w-full'>
                            <div className='flex justify-between items-center'>
                                <div className='text-start mx-2 text-xs'>
                                    <div className='font-bold'>{el.name}</div>
                                    {/* <div className='text-[0.6rem] text-white/70 pr-3'>{el.description}</div> */}
                                </div>
                                {completed_tasks[el.uuid] ? 
                                <div className='text-xs p-2 border-white/20 text-white rounded-3xl font-semibold cursor-pointer border w-fit px-5 text-nowrap'>Fluxed</div>
                                :
                                <div className='text-xs p-2 border-black text-black rounded-3xl font-semibold cursor-pointer bg-[#9AF6C1] border w-fit px-5 text-nowrap' onClick={() => { checkTask(el.api, el.uuid, el.href) }}>Flux</div>
                                }
                            </div>
                        </div>
                    ))}
                    {/* {isCompleted ?
                        <div className="w-full bg-black flex justify-center items-center py-2.5 text-white font-semibold rounded-2xl mt-2 max-[300px]:mt-2 cursor-pointer opacity-40 border-2 border-white duration-300 transition-all mb-24">
                            <div>Claimed</div>
                        </div>
                        : */}
                </div>
            </div>
        </>
    )
}
export default EventClaimPage