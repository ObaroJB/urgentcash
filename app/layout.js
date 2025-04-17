import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import  Footer  from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { AppProvider } from "@/config/context.config";
import  { SessionProvider} from "next-auth/react";




const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "UrgentCa$h",
  description: "Loans at your doorstep",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar/>
        <AppProvider>
        <SessionProvider>
        {children}
        </SessionProvider>
        </AppProvider>
         <Footer/> 
      </body>
    </html>
  );
}
