import HistoryTab from "@/components/HistoryTab"





export default function LoanHistory () {
    return (
       <main className="min-h-screen flex justify-center items-center bg-gray-50">
         <div className="w-[300px] min-h-[400px] bg-white rounded-md p-4">
            <h1>My Loan History</h1>
            <div className="flex flex-col gap-4">
            <HistoryTab/>
            </div>
         </div>
       </main>


    )}