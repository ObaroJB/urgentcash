import { SlCalender } from "react-icons/sl";
import { FaLock } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";
import { FaMoneyBillWave } from "react-icons/fa";
export default function Pain() {
return (
    
    <main>
<div className="min-h-screen bg-blue-900 text-white">  



<div className="text-center py-16 px-4">
    <h2 className="text-4xl font-bold">Fast. Easy. Loans your way.</h2>
<div className="mt-6">
      <input type="text" placeholder="Phone Number" className="text-xl text-black" />
      <button className="bg-green-600 px-4 py-2 ml-2">Get a Loan</button>
</div>
    <p className="text-sm mt-2">Checking for loan offers is completely free. We never share your information. </p>
     <a href = "#">  Terms & Conditions</a>
<ul className="mt-4 ">
      <li> *Receive funds in 2 minutes or less</li>
      <li> *No documentation needed</li>
      <li> *Interest as low as 4%</li>
</ul>
</div>
  
<div className="bg-blue-800 py-8 text-center">
<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
<div>
        <p className=" ml-49"><SlCalender/></p>
        <p className="text-2xl font-bold">24/7</p>
        <p>Always available</p>
</div>
<div>
        <p className="ml-49"><FaLock/></p>
        <p className="text-2xl font-bold">Safe</p>
        <p>Always secure</p>
</div>
<div>
        <p className="ml-49"><IoPeopleSharp/></p>
        <p className="text-2xl font-bold">1M+</p>
        <p>Clients</p>
</div>
<div>
        <p className="ml-49"><FaMoneyBillWave/></p>
        <p className="text-2xl font-bold">40B+</p>
        <p>Borrowed</p>
</div>
</div>
</div>
</div>





       
       
    </main>
  );
}



 