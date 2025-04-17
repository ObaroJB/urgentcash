      "use client"
import { Button, TextField } from "@mui/material"
import { useFormik } from "formik"
import * as yup from "yup";



const schema = yup.object().shape({
    amount: yup.number().required().min(1000)
})
export default function LoanDetails () {
    const {handleSubmit, handleChange,touched,values,errors} = useFormik({
    initialValues: {
    amount:" ",
    },
    validationSchema:schema
});
   return (
    <main className="min-h-screen flex justify-center items-center bg-gray-50 py-15"> 
         <div className="w-[380px] min-h-[400px] bg-white rounded-md p-4">
             <h1 className="text-2xl text-gray-800 mb-4">Loan Details</h1>
             <div className="flex flex-col gap-4">
                <ul className="grid grid-cols-2 pb-2 pb-3 mb-3 border-b border-geen-600">
                   <li className="text-lg text-gray-700 uppercase">Amount</li>
                   <li className="text-lg text-gray-700 text-end">amount</li>
                </ul>
                <ul className="grid grid-cols-2 pb-2 pb-3 mb-3 border-b border-geen-600">
                   <li className="text-lg text-gray-700 uppercase"> Payback Amount</li>
                   <li className="text-lg text-gray-700 text-end">payback</li>
                </ul>
                <ul className="grid grid-cols-2 pb-2 pb-3 mb-3 border-b border-geen-600">
                   <li className="text-lg text-gray-700 uppercase">Duration</li>
                   <li className="text-lg text-gray-700 text-end">duration</li>
                </ul>
                <ul className="grid grid-cols-2 pb-2 pb-3 mb-3 border-b border-geen-600">
                   <li className="text-lg text-gray-700 uppercase">Rate</li>
                   <li className="text-lg text-gray-700 text-end">rate</li>
                </ul>
                <ul className="grid grid-cols-2 pb-2 pb-3 mb-3 border-b border-geen-600">
                   <li className="text-lg text-gray-700 uppercase">Total Offset</li>
                   <li className="text-lg text-gray-700 text-end">total offset</li>
                </ul>


                <form onSubmit={handleSubmit}
                 className="bg-green-100 p-4 rounded-md">
                    <div className="flex flex-col gap-1 mb-2">
                        <label className="flex flex-col gap-1 mb-2"></label>
                        <TextField
                        id="amount"
                        type="number"
                        label="amount"
                        value={values.amount}
                        onChange={handleChange}/>
                        {touched.amount && errors.amount ? <span className="text-xs text-red-500">{errors.amount}</span> 
                        : null}
                        

                    </div>
                    <div className="flex items-center gap-3">
                        <Button type="submit" color="error" variant="outlined" >Validate Amount</Button>

                    </div>

                </form>
             </div>
         </div>

    </main>
   )

}