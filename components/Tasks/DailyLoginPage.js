import Image from "next/image";
import axios from "axios";
import { useRef, useState } from "react";
import { error, success } from "@/utils/toast";
import { transaction } from "../Home/Tasks";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
const rewards = [1, 2, 4, 8, 16, 32, 64];
const DailyLoginPage = ({ data }) => {
    const [tonConnectUI] = useTonConnectUI();
    const walletAddress = useTonAddress()
    let { claimed, title, reward, description, fetchUser } = data
    const [clickable, setClickable] = useState(true)
    const loading = useRef(false)
    const [strike, setStrike] = useState(claimed)
    const claim = async () => {
        loading.current = true
        setClickable(false)
        if(!walletAddress){
            setClickable(true)
            return error('Connect wallet first')
        }
        const WebApp = (await import('@twa-dev/sdk')).default
        WebApp.ready()
        const initData = WebApp.initData
        let check = await axios.post('/api/claim/daily_login/check', { data: initData ? initData : 'query_id=AAHaxPIwAgAAANrE8jALLDTQ&user=%7B%22id%22%3A5116183770%2C%22first_name%22%3A%22FAith%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22snoxl%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1730195778&hash=82b7f5ea47b41a8b54c527745bc6f34e4688c5dc7b61d8c25d431ea8dbaff7e1' })
        if(!check.data.ok){
            error(check.data.message)
            setClickable(true)
            return true
        }
        const boc = await tonConnectUI.sendTransaction(transaction)
        const { data } = await axios.post('/api/claim/daily_login', { data: initData ? initData : 'query_id=AAHaxPIwAgAAANrE8jALLDTQ&user=%7B%22id%22%3A5116183770%2C%22first_name%22%3A%22FAith%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22snoxl%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1730195778&hash=82b7f5ea47b41a8b54c527745bc6f34e4688c5dc7b61d8c25d431ea8dbaff7e1' ,payload: { boc }})
        if (data.ok) {
            success(data.message)
            await fetchUser()
            setStrike(prev => prev + 1)
        } else {
            error(data.message)
        }
        loading.current = false
        setTimeout(() => {
            setClickable(true)
        }, 1500)
    }
    return (
        <>
            <div className="p-4 overflow-y-scroll text-white">
                <div className="text-2xl font-semibold w-[60%] leading-7">{title}</div>
                <div className="text-white/80 text-xs font-normal w-[80%] leading-4 my-2">{description}</div>
                <div className="w-full bg-white/30 rounded-2xl mt-4 p-2 text-white justify-between items-center leading-5 flex gap-3 font-semibold">
                    <div className="px-2">Reward</div>
                    <div className="p-2 rounded-2xl">{reward}</div>
                </div>
                <div className="grid mt-5 gap-y-2  grid-cols-4 max-[340px]:grid-cols-3">
                    {rewards.map((el, index) => (
                        <div key={index} className="flex m-1 justify-center items-center" >
                            <div className="w-20 h-20  shadow-xl text-white rounded-2xl flex flex-col justify-center items-center" style={{ background: strike >= index + 1 ? 'linear-gradient(20deg, rgba(154,246,193,0.45) 0%, rgba(0,0,0,0.4) 100%)' : 'rgb(255 255 255 / 0.1)', borderWidth: strike >= index + 1 ? '0px' : '1px', borderColor: strike >= index + 1 ? 'rgb(255 255 255 / 0)' : 'rgb(255 255 255 / 0.1)' }}>
                                <div className="font-semibold text-xs my-2 text-white/80">DAY {index + 1}</div>
                                <div className="font-bold text-2xl mb-3">
                                    {el}<span className="text-xs font-semibold">Flux</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <>
                    {clickable ?
                        <div className="w-full bg-white flex justify-center items-center py-2.5 text-black font-semibold rounded-xl mt-5 max-[300px]:mt-2 cursor-pointer hover:bg-black hover:text-white border-2 border-white hover:border-[#9AF6C1] duration-300 transition-all" onClick={()=>{!loading.current ? claim() : null}}>
                            <div>Claim</div>
                        </div> :
                        <div className="w-full bg-white flex justify-center items-center py-2.5 text-white font-semibold rounded-xl mt-5 max-[300px]:mt-2 cursor-pointer border-2 bg-opacity-50 opacity-60 border-[#9AF6C1] duration-300 transition-all">
                            <div>Claiming...</div>
                        </div>
                    }
                </>
            </div>
        </>
    )
}
export default DailyLoginPage;