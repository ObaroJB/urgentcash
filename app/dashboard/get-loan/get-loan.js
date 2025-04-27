"use client"
import { db } from "@/config/firebase.config";
import { CircularProgress, TextField } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import * as yup from "yup";


const schema = yup.object().shape({
  amount:yup.number().required().min(5000),
})

const duration = [
  {id: "7", days:7},
  {id: "30", days: 30},
  {id: "90",  days: 90},
]

export default function GetLoan ({userId}){
  const{data : session} = useSession();
  console.log(session)
  

     const [clickedRate, setClickedRate] = useState(undefined);
     const [rate , setRate] = useState(0);
     const [paybackAmount, setPaybackAmount] = useState(0);
     const [loanDate, setLoanDate]= useState(0);
     const [opsProgress, setOpsProgress] = useState(false)

     const {handleSubmit, handleChange, values,touched,errors} =useFormik({
    initialValues: {
      amount:"",
    },
    onSubmit: async() => {
      const userIdentifier = userId || (session?.user?.id || session?.user?.uid);
  
      if (!userIdentifier) {
        setOpsProgress(false);
        alert("User identification missing. Please log in again.");
        return;
      }

       setOpsProgress(true)
       await addDoc(collection(db, "loans"), {
         user: userIdentifier,
         amount: values.amount,
         paybackAmount:paybackAmount,
         rate: rate,
         duration: loanDate,
         timecreated: new Date().getTime(),
       }).then(() => {
        setOpsProgress(false)
        alert(`You have successfully applied for a loan of ${values.amount} with a payback amount of #${paybackAmount} at a rate of ${rate}%  for ${loanDate}days`)
       })
       .catch(e => {
        setOpsProgress(false);
        console.error(e);
        alert(` Something went wrong : ${e}`)
       })
    },
    validationSchema:schema
     })
    useEffect(()=>{
       if (values.amount >= 1) {
        const Interest =( rate * values.amount) / 100;
        setPaybackAmount(values.amount + Interest);
       }
    },[values.amount,rate] ) 

    return (
        <main className="min-h-screen flex justify-center py-4 md:py-6 md:px-6 lg:px-16 bg-gray-50" >
          <div className="w-full md:w-[380px] flex flex-col gap-4 border border-gray-200 rounded-md p-2 md:pb-6">
            <blockquote className="border-b border-gray-200 pb-3">
                <span className="font-thin text-lg text-green-800 text-center">Get Instant Loan from UrgentCa$h</span>
            </blockquote>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
               <div className="flex flex-col gap-1">
                 <label className="text-green-800 text-xs">Enter Amount to borrow</label>
                 <TextField
                 id="amount"
                 variant="outlined"
                 type="number"
                 placeholder="loan amount"
                 value={values.amount}
                 onChange={handleChange} />
                 {touched.amount&& errors.amount ? <span className="text-xs text-red-500">{errors.amount}</span> : null}
               </div>
               <div className=" border-dashed border border-green-600 p-4 rounded-md">
                   <p className="text-green-800 text-sm mb-3">Choose Loan duration</p>
                   <ul className="grid grid-cols-3 gap-2">
                        { duration.map( item =><li 
                              key={item.id}
                              onClick={() => {
                                setClickedRate(item.id)
                                if (item.days === 7) {
                                  setRate(5)
                                }
                                else if (item.days === 30){
                                  setRate(15)
                                }
                                else if (item.days === 90) {
                                  setRate(30)
                                }
                                if (item.days ===7){
                                  setLoanDate(7)
                                }
                               else if (item.days === 30) {
                                  setLoanDate(30)
                                }
                                else if (item.days === 90) {
                                  setLoanDate(90)
                                }
                              }}
                           className="h-16 bg-green-400 text-white text-md uppercase rounded-md justify-center flex items-center cursor-pointer">{item.days} Days</li>
                          )}
                   </ul>
               </div>
               <div className="border-dashed border border-green-600 p-4 rounded-md">
                   <p className="text-green-800">Interest rate for {loanDate} days</p>
                   <p className="text-4xl text-green-800">{rate}%</p>
               </div>
               <div className="flex flex-col gap-3 bg-gradient-to-b from-green-500 to-green-800 border-dashed border border-green-600 p-4 rounded-md ">
                <p className="text-green-100">Pay back Amount</p>
                <p className="text-4xl text-white">₦{paybackAmount}</p>
               </div>
               <div className="flex items-center gap-1">
                <button  type="submit" className="p-2 rounded-md bg-green-600 text-white text-xl uppercase">Get Loan</button>
                <CircularProgress  style={{display: !opsProgress ? "none" : "flex" }} />
               </div>
            </form>
          </div>
        </main>
    )
}