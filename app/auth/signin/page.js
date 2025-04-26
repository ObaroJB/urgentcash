import { auth, signIn } from "@/auth";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";



export default async function Auth () {
    const session = await auth();
    console.log(session)
    
    return (
        <main className="min-h-[520px] flex justify-center bg-gray-50 py-8 px-2" >
            <article>
                <div className="w-full md:w-[30em] rounded-md bg-white p-4">
                   <h1 className="text-2xl mb-2">Sign into urgentCa$h</h1>
                      <p>Sign in Using .....</p>
                  <form 
                  action={async () => {
                       "use server"
                    await signIn("google")
                  }} 
                  className="mb-2">
                    <button type="submit" className="w-full h-[3.2em] flex justify-center items-center gap-2 border-b-2 border-green-500 bg-black rounded-md">
                        <FaGoogle className="text-white text-3xl"/>
                       <span className="text-white text-lg">Google Account</span>
                    </button>
                 </form>  
                  <p className="text-gray-600 text-xs">
                    By clicking on the signin button you confirm that you have read and agree with our {""} 
                    <Link href="#" className="text-gray-800 underline" >Terms of Use</Link> {" "} and {" "}
                    <Link href="#" className="text-gray-800 underline">Privacy Policy</Link>                 
                 </p>  
                </div>
            </article>
        </main>
    )
}