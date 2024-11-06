'use client'
import React from 'react'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
const AppWallerProvider = ({children}) => {
  return (
    <TonConnectUIProvider manifestUrl="https://flux-green-theta.vercel.app/tonconnect-manifest.json">
        {children}
    </TonConnectUIProvider>
  )
}

export default AppWallerProvider
