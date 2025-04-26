"use client"
import Link from "next/link";
import { useState } from "react";
import { FaGripLines } from "react-icons/fa6";



export default function Navbar (){
       const [menuOpen, setMenuOpen] = useState(false);

       const toggleMenu = () => {
          setMenuOpen(!menuOpen)
       }
     return (
         <main className="bg-white shadow shadow-gray-200 w-full">
            <div className="flex justify-between items-center pt-3 px-5 h-[50px]">
               <p className="font-bold text-green-400">UrgentCa$h</p>
               <ul className="hidden md:flex gap-10 font-semibold cursor-pointer">
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/dashboard/get-loan">Get Loan</Link></li>
                  <li><Link href="/dashboard/loan-history">History</Link></li>
                  <li><Link href="/dashboard/loan-details">Loan-Details</Link></li>
                  <li><Link href="/dashboard/profile">Profile</Link></li>
               </ul>
               <p className="hidden md:block h[50px] w-[80px] bg-green-400 text-white text-center"><Link href="/auth/signin">Sign In</Link></p>

               <div className="block md:hidden">
                <FaGripLines className="text-xl cursor pointer text-green-500"
                onClick={toggleMenu} />
               </div>
            </div>
           {menuOpen && (
            <div className="md:hidden px-5 pb-1">
              <ul className="flex flex-col gap-3">
                 <li>Home</li>
                 <li>Get Loan</li>
                 <li>History</li>
                 <li>Loan-Details</li>
                 <li>Profile</li>
              </ul>
              <p className="mt-2">Sign In</p>
            </div>
            )}
         </main>
     )
}