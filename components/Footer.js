import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";


export default  function Footer (){
    const year = new Date().getFullYear()
    return (
        
        <footer className="grid grid-cols-1 gap-4 md: grid-cols-2 px-8 lg:grid-cols-3 py-4 px-2 lg:gap-0">
        <div>
          <p className="text-2xl text-green-600 font-bold"> UrgentCa$h</p>
          <p className="text-xs text-gray-600"> &copy; {year} Urgent LTD.</p>
        </div>
        <div>
            <p  className="text-md text-gray-700">Head Office</p>
            <p className="text-md text-gray-700">Ademola Adetokunbo Crescent, Wuse II, Abuja, Nigeria.</p>
        </div>
        <div>
            <ul className="flex lg:justify-end items-center gap-4">
              <li><Link href=""><FaFacebook className="text-lg text-green-600"/></Link></li>
              <li><Link href=""><FaTiktok className="text-lg text-green-600"/></Link></li>
              <li><Link href=""><FaTwitter className="text-md text-green-600"/></Link></li>
              </ul>

              <ul className = "flex lg:justify-end items-center gap-4">
              <li><Link href="" className="text-sm text-gray-600"></Link>Terms of use</li>
              <li><Link href="" className="text-sm text-gray-600"></Link>Privacy Policy</li>
              <li><Link href="" className="text-sm text-gray-600"></Link>Bug Bounty</li>
              </ul>
        </div>
        </footer>
        
    )
}