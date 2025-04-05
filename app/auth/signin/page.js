import { signIn } from "@/auth";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";

export default function Auth (){
return (
<main className="min-h-[520px] flex justify-center bg-gray-50 py-8 px-2">
  <article>
        <div className="w-full md:w-[30em] rounded-md bg-white p-4">
            <h1 className="text-2xl mb-2">Sign into UrgentCa$h</h1>
            <p>Sign in using.... </p>
            <form 
            action={async () => {
                "use server"
                await signIn("google")
            }}
            className="mb-2">
                <button className="w-full h-[3.2em] flex justify-center items-center gap-2 border-b-2 border-green-600 bg-black rounded-md">
                            <FaGoogle className="text-green-600 text-2xl"/>
                    <span className="text-green-600 text-lg">Google Account</span>

                </button>

            </form>
             <p className="text-gray-600 text-xs">
                By clicking on the signin button you confirm that you have read and agreed with our("")
               <Link href = "#" className ="text-gray-800 underline">Terms of use</Link> {" "} and {" "}
               <Link href = "#" className = "text-gray-800 underline">Privacy Policy</Link>
             </p>
        </div>
    </article>  
</main>

)

}