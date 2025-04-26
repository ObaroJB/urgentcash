"use client"
import { HistoryTab } from "@/components/HistoryTab"
import { db } from "@/config/firebase.config"
import { collection,  getDocs, orderBy, where } from "firebase/firestore"
import { useSession } from "next-auth/react"
import React from "react"


export default function LoanHistory ({userId}) {
  const [loans,setLoans] = React.useState([]);
 const {data: session} = useSession();
 const userIdentifier = userId || (session?.user?.id || session?.user?.uid);

 React.useEffect(() => {
    const handleFetchLoans = async() => {
       const q = collection(db,"loans");
       const onSnap = await getDocs(q,
        where("user", "==",userIdentifier),
        orderBy("timecreated", "desc")
       );
       const compileResults = [];
       
        onSnap.docs.forEach(doc => {
          compileResults.push({
            id:doc.id,
            data:doc.data()
          });
          setLoans(compileResults)
          console.log(compileResults);
        })
    }
     session ? handleFetchLoans(): null;
 },[session])

    return (
        <main className="min-h-screen flex justify-center items-center bg-gray-50 ">
          <div className="w-[380px] min-h-[400px] bg-white rounded-md p-4">
             <h1 >My Loan History</h1>
             <div className="flex flex-col gap-4">
           {loans.map(loan=> <HistoryTab
              docId={loan.id}
              amount={loan.data.amount}
              rate={loan.data.rate}
              duration={loan.data.duration}
              timestamp ={loan.data.timecreated}
              payback={loan.data.paybackAmount} 
              type= "personal"
              key={loan.id}/>
            )}  
             </div>
          </div>
        </main>
    )
}