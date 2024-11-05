const EventTab = ({ title, description, btnTxt, Func }) => {
  return (
    <div className='bg-[#323232] border-white/60 text-white bg-opacity-70 rounded-3xl p-4 w-full z-10'>
      <div className='flex justify-between items-center'>
        <div className='text-start mx-2'>
          <div className='font-bold '>{title}</div>
          <div className='text-[0.65rem] text-white/70'>{description}</div>
        </div>
        <div className='text-xs p-2.5 bg-black text-white rounded-3xl font-semibold cursor-pointer border-[#9AF6C1] border w-fit px-5 text-nowrap' onClick={Func} >{btnTxt}</div>
      </div>
    </div>
  )
}
export default EventTab;