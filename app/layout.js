import localFont from "next/font/local";
import "./globals.css";

const SatoshiVariable = localFont({
  src: "./fonts/Satoshi-Variable.woff2",
  variable: "--font-Satoshi-Variable",
  weight: "100 900",
});

export const metadata = {
  title:'Flux market'
}
export default function RootLayout({ children }) {
  return (

    <html lang="en">
      <body
        className={`${SatoshiVariable.variable} antialiased`}
      >
          {children}
      </body>
    </html>
  );
}
