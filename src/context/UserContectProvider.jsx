import { createContext, useState } from "react";

export const userContext = createContext();

export const UserContextProvider = ({children}) =>{
    const[user,setUser] = useState({
        id:1,
        name:"Rafi Dani",
        email:"rafi12345",
    });

    return (
        <userContext.Provider value={{user,setUser}}>
            {children}
        </userContext.Provider>       
    )
}