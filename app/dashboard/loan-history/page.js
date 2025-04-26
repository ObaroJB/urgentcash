import { auth } from "@/auth";
import { AuthorizationCheck } from "@/config/authorization-check";
import LoanHistory from "./loan-history";

export default async  function page () {
  const session = await auth();

  return (
    <>
    <AuthorizationCheck/>
    <LoanHistory userId = {session?.user?.id}/>
    </>
  )
   
}