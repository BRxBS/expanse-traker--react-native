import React, { createContext, ReactNode, useContext } from "react";




interface TransactionsProviderProps{
    children: ReactNode
}

interface User{
    id: string;
    name: string;
    email: string;
    photo?: string;
}
interface IAuthContextData{
user: User
}

export const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({children} : TransactionsProviderProps ){
    



    const user = {
        id: '1',
        name: 'un',
        email:'ui',
        photo:'qq'
    }
    return(
        <AuthContext.Provider value={ { user } }>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext)
    return context;
}

export {AuthProvider, useAuth}