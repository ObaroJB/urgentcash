import { auth, signOut } from "@/auth";
import { AuthorizationCheck } from "@/config/authorization-check";
import { Button } from "@mui/material";
import { redirect } from "next/dist/server/api-utils";
import Image from "next/image";
import Link from "next/link";



export default async function Profile() {
     const session = await auth();
     return (
              <>
            <AuthorizationCheck/>
          <main className="min-h-screen flex justify-center py-4 md:py-6 md:px-12 lg:py-8 lg:px-16 bg-gray-100">
              <div className="w-full md:w-[380px] flex flex-col gap-4 border border-gray-200 rounded-md bg-gray-50 p-2 md:p-6">
               <div className="flex justify-center">
                 <Image 
                 src={session?.user?.image}
                 height={80}
                 width={80}
                 alt="profile image"
                 className="w-[80px] h-[80px] rounded-full "/>
              </div> 
                <p className="text-center py-3 border-b border-gray-600">{session?.user?.name} </p>
                <p className="text-center py-3 border-b border-gray-600">{session?.user?.email}</p>
                <p className="text-center py-3 border-b border-gray-600">CUSTOMER ID: {session?.user?.id} </p>
                <form 
                action={async() => {
                       "use server"
                     await signOut()
                     redirect("auth/signin")
                }}
                className="">
                <Button className="w-full" variant="contained" color="error" type="submit" >Log Out</Button>
                </form>

                <Link href="#" className="bg-gray-300 rounded-md text-lg text-center p-2">Update Profile</Link>
              </div>
              
          </main>
          </>
     )
}