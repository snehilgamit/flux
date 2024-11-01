import localFont from "next/font/local";
import "./globals.css";
import AppWalletProvider from "@/components/solana/AppWalletProvider";

const SatoshiVariable = localFont({
  src: "./fonts/Satoshi-Variable.woff2",
  variable: "--font-Satoshi-Variable",
  weight: "100 900",
});


export default function RootLayout({ children }) {
  return (

    <html lang="en">
      <body
        className={`${SatoshiVariable.variable} antialiased`}
      >
        <AppWalletProvider>
          {children}
        </AppWalletProvider>
      </body>
    </html>
  );
}
