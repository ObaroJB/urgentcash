export default function HistoryTab () {
    return(
        <div className="flex flex-col border border-green-600 rounded-md p-3 cursor-pointer ">
          <ul className="flex justify-between border-b border-green-600 pb-2">
            <li className="font-bold text-2xl text-gray-700">Amount</li>
            <li className="text-xs text-gray-500">Rate</li>
          </ul>
          <ul className="flex justify-between items-center pt-2">
              <li className="text-sm text-gray-700">Duration</li>
              <li className="text-sm text-gray-700">Date</li>
              <li className="text-sm text-gray-700">Payback Amount</li>
            
          </ul>
        </div>
    )
}