"use client"
import { createContext, useState } from "react";

const AppContext = createContext();

const AppProvider =({children}) => {
    const [LoanDocId, setLoanDocId] = useState(null)
      return (
        <AppContext.Provider value= {{LoanDocId , setLoanDocId}}>
            {children}
        </AppContext.Provider>

      );
};
export {AppContext, AppProvider}
