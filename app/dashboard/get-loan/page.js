import { auth } from "@/auth";
import { AuthorizationCheck } from "@/config/authorization-check";
import GetLoan from "./get-loan";


export default async  function page () {
  const session = await auth();

  return (
    <>
    <AuthorizationCheck/>
    <GetLoan userId = {session?.user?.id}/>
    </>
  )
   
}