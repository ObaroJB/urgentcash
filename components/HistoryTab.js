import { AppContext } from "@/config/context.config";
import { TimestampToDate } from "@/utils/timestamp-to-date";
import { useRouter } from "next/navigation";
import { useContext } from "react";



export function HistoryTab ({docId, amount , rate , duration, payback, timestamp }) {
    const {setLoanDocId} = useContext(AppContext);
        const router = useRouter();
     return (
        <div
        onClick={() => {
            setLoanDocId(docId);
            router.push("/dashboard/loan-details")
          }} 
        
        className="flex flex-col border border-green-200 rounded-md p-3 cursor-pointer">
            <ul className="flex justify-between border-b border-green-100 pb-2">
                <li className="font-bold text-2xl text-gray-700">₦ {amount} </li>
                <li className="text-xs text-gray-500"> {rate}%</li>
            </ul>
            <ul className="flex justify-between items-center pt-2">
                <li className="text-sm text-gray-700"> {duration} days</li>
                <li className="text-sm text-gray-700">{TimestampToDate(timestamp)} </li>
                <li className="text-sm text-gray-700"> ₦{payback} </li>
            </ul>

        </div>
     )
}