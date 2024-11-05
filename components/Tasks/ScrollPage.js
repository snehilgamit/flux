import Image from 'next/image';
const ScrollPage = ({ children, visible ,closeEvent}) => {
    return (
        <div className='h-[95%] max-[342px]:h-[95%] rounded-t-3xl border-t-[5px] border-t-[#9AF6C1] bg-[#000] fixed -bottom-[0%] transition-all duration-500 ease-in-out z-50 w-full overflow-y-scroll' style={{ bottom: visible ? 0 : '-150%' }}>
            <div className='right-4 top-4 bg-white w-8 h-8 absolute flex justify-center items-center rounded-full hover:scale-110 transition-all duration-150 ease-in-out' onClick={closeEvent}>
                <Image
                    src="https://step3netpublic.s3.ap-southeast-1.amazonaws.com/public/account/arrow-left-long.svg"
                    width={18}
                    height={18}
                    alt='arrow' />
            </div>
            {children}
        </div>
    )
}
export default ScrollPage;