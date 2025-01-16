import "./globals.css";
import {Inter} from "next/font/google"
import Navbar from '@/components/Navbar'
const inter = Inter({subsets: ['latin']})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`relative ${inter.className}`}>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
