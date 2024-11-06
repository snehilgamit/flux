import Head from "next/head";
import localFont from "next/font/local";
import "./globals.css";
import AppWalletProvider from "@/components/ton/AppWalletProvider";

const SatoshiVariable = localFont({
  src: "./fonts/Satoshi-Variable.woff2",
  variable: "--font-Satoshi-Variable",
  weight: "100 900",
});

export const metadata = {
  title: 'Flux market',
}
export const viewport={
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}
export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{'--safe-area-inset-bottom':'0px'}}>
      <body
        className={`${SatoshiVariable.variable} antialiased h-[calc(100%-105px)]  w-full flex flex-col`}
      >
        <AppWalletProvider>
          {children}
        </AppWalletProvider>
      </body>
    </html>
  );
}