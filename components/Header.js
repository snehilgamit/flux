'use client'
import { TonConnectButton } from '@tonconnect/ui-react'
import React from 'react'

const Header = ({title}) => {
  return (
    <div className='text-white px-4 py-4 mb-4 font-bold text-2xl pb-0 flex justify-between'>
        <p>{title}</p>
        {/* <div className='px-3 py-1.5 cursor-pointer' onClick={connectWallet} style={{
          backgroundColor: 'black',
          color: '#9AF6C1',
          borderRadius: '20px',
          fontSize: '15px'
        }} >{!connected && 'Connect wallet'}</div> */}
        <TonConnectButton style={{scale:0.8,transform:'translateX(20px)'}}></TonConnectButton>
      </div>
  )
}

export default Header
