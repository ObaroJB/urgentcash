"use client"
import { AppContext } from "@/config/context.config";
import { db } from "@/config/firebase.config";
import { SumFromArray } from "@/utils/SumFromArray";
import { Button, Skeleton, TextField } from "@mui/material";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import * as yup from "yup";
import { closePaymentModal, FlutterWaveButton } from 'flutterwave-react-v3';
import { useSession } from "next-auth/react";



 const schema = yup.object().shape({
    amount: yup.number().required().min(1000),
 })

export default function LoanDetails ({user}) {
    const {data : session} = useSession();
    console.log(session)

    const {loanDocId} = React.useContext(AppContext);
    const [loan,setloan] = React.useState(null);
    const [offsets, setOffsets] = React.useState([]);
    const [totalOffsets, setTotalOffsets] = React.useState(0);
    const [validateAmount, setValidateAmount] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

     const router = useRouter();

     React.useEffect(()=> {
        if (loanDocId === null) {
            router.push("/dashboard/loan-history")
        }
     },[loanDocId,router]);

     React.useEffect(() => {
        const handleFetch = async () => {
            if (!loanDocId) {
                setIsLoading(false);
                return;
            }
            
            try {
                const docRef = doc(db, "loans", loanDocId);
                const res = await getDoc(docRef);
                
                if (res.exists()) {
                    setloan(res.data());
                } else {
                    alert("Invalid request ID");
                    router.push("/dashboard/loan-history");
                }
            } catch (error) {
                console.error("Error fetching loan:", error);
            }
            
            setIsLoading(false);
        };
        
        handleFetch();
    }, [loanDocId, router]);
     // retrieve the loan offsets , to be used in update
        React.useEffect(()=>{
            loan !== null ? setOffsets(loan?.offsets) : null ;
            loan?.offsets ? setTotalOffsets(SumFromArray(loan?.offsets)) : null;
        }, [loan]);

    const {handleSubmit,handleChange,touched,values,errors} = useFormik({
        initialValues: {
            amount: ""
        },
        onSubmit: ()=> {
           setValidateAmount(true);
        },
        validationSchema:schema
    });
    // re-validate amount so that flutterwave payment is not initiated with empty figures
    React.useEffect(() => {
        if(validateAmount) {
            setValidateAmount(false)
        }
    },[values.amount])
    // >>>> Flutterwave components <<<<<
    const config = {
        public_key: 'FLWPUBK_TEST-07eb955aba643e63f3c057bd00d016ff-X',
        tx_ref: Date.now(),
        amount: Math.round(values.amount),
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
          email:  user?.email || session?.user?.email, 
          phone_number: '09036786860',
          name: user?.name
        },
        customizations: {
          title: 'Loan repayment',
          description: 'Pay off loan or make installment',
          logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
      };
    
     const fwconfig = {
        ...config,
        text: "Make payment",
        callback : async (response)=> {
        const docId = await addDoc(collection(db,"payments"), {
            amount: response.amount,
            responseCode: response.charge_response_code,
            currency:response.currency,
            flwRef: response.flw_ref,
            txRef: response.tx_ref,
            status:response.status,
            user: user?.id || session?.user?.id,
            loanId: loanDocId,
            timecreated : new Date().getTime()
        });

        const reLoanOffsets = [...(offsets || [])];
        reLoanOffsets.push({
          amount: Number(values.amount), // Ensure it's a number
          paymentDocId: docId.id,
          timestamp: new Date().getTime() // Add timestamp for tracking
        });

            // Calculate the new total offsets
        const newTotalOffsets = SumFromArray(reLoanOffsets);
        
        // Prepare update data object
        const updateData = {
        offsets: reLoanOffsets
        };
        
        // Check if loan is now cleared
        if (newTotalOffsets >= loan.paybackAmount) {
        updateData.status = "cleared";
        updateData.clearedDate = new Date().getTime();
        updateData.remainingAmount = 0;
        } else {
        updateData.remainingAmount = loan.paybackAmount - newTotalOffsets;
        }

        // Update the loan document
        await updateDoc(doc(db, "loans", loanDocId), updateData);
        console.log("Loan updated successfully. Status:", newTotalOffsets >= loan.paybackAmount ? "cleared" : "active");

        // Refresh local state
        setOffsets(reLoanOffsets);
        setTotalOffsets(newTotalOffsets);
        
        // Update the loan object to reflect changes
        setloan(prev => ({
        ...prev,
        ...updateData
        }));
        
        // Reset form
        values.amount = "";
        setValidateAmount(false);
        
        // Show success message with status update
        if (newTotalOffsets >= loan.paybackAmount) {
        alert("Congratulations! Your payment of " + response.amount + " has been processed and your loan has been fully cleared.");
        } else {
        alert("Payment of " + response.amount + " processed successfully! Remaining amount: " + updateData.remainingAmount);
        }
          closePaymentModal() // this will close the modal programmatically
        },
        onClose: () => {},
     };
     // >>>>>>flutterwave components <<<<<

    return (
        <main className="min-h-screen flex justify-center items-center bg-gray-50 py-15">
            <div className="w-[380px] min-h-[400px] bg-white rounded-md p-4 ">
                 <h1 className="text-2xl text-gray-800 mb-4">Loan Details</h1>
                 { loan !== null ?
                 <div className="flex flex-col gap-4">
                    <ul className="grid grid-cols-2 pb-3 mb-3 border-b border-green-200">
                       <li className="text-lg text-gray-700 uppercase">Amount</li>
                       <li className="text-lg text-gray-700 text-end"> {loan.amount} </li>
                    </ul>
                    <ul className="grid grid-cols-2 pb-3 mb-3 border-b border-green-200">
                       <li className="text-lg text-gray-700 uppercase">Payback Amount</li>
                       <li className="text-lg text-gray-700 text-end">{loan.paybackAmount} </li>
                    </ul>
                    <ul className="grid grid-cols-2 pb-3 mb-3 border-b border-green-200">
                       <li className="text-lg text-gray-700 uppercase">Duration</li>
                       <li className="text-lg text-gray-700 text-end"> { loan.duration}</li>
                    </ul>
                    <ul className="grid grid-cols-2 pb-3 mb-3 border-b border-green-200">
                       <li className="text-lg text-gray-700 uppercase">Rate</li>
                       <li className="text-lg text-gray-700 text-end"> {loan.rate}</li>
                    </ul>
                    <ul className="grid grid-cols-2 pb-3 mb-3 border-b border-green-200">
                       <li className="text-lg text-gray-700 uppercase">Total Offset</li>
                       <li className="text-lg text-gray-700 text-end">{totalOffsets} </li>
                    </ul>

                    <form onSubmit={handleSubmit}
                    style={{display: totalOffsets >= loan.paybackAmount ? "none" : "block"}}
                        className="bg-green-100 p-4 rounded-md">
                        <div className="flex flex-col gap-1 mb-2">
                            <label className="text-xs text-gray-700 ">Offset this Loan</label>
                            <TextField 
                            id="amount"
                            type="number"
                            label="amount"
                            value={values.amount}
                            onChange={handleChange}/>
                            {touched.amount && errors.amount ? <span className="text-xs text-red-500">{errors.amount}</span> : null}
                        </div>
                        <div className="flex items-center gap-3">
                             <Button type="submit" color="error" variant="outlined" >Validate Amount</Button>
                             {validateAmount? <FlutterWaveButton  {...fwconfig} className="bg-green-300 rounded-md px-2 py-1 text-white" /> : null}
                        </div>

                    </form>
                 </div>
                 :
                  <div className="flex flex-col gap-4">
                     <Skeleton variant="rectangular" className="w-full h-14 rounded-md"/>
                     <Skeleton variant="rectangular" className="w-full h-14 rounded-md"/>
                     <Skeleton variant="rectangular" className="w-full h-14 rounded-md"/>
                  </div>
                 }
            </div>
        </main>
    )
}