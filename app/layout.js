import Head from "next/head";
import localFont from "next/font/local";
import "./globals.css";
import AppWallerProvider from "@/components/ton/AppWallerProvider";

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
    <html lang="en">
      <body
        className={`${SatoshiVariable.variable} antialiased h-screen`}
      >
        <AppWallerProvider>
          {children}
        </AppWallerProvider>
      </body>
    </html>
  );
}
