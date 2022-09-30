import React, { createContext, ReactNode, useContext, useState } from "react";
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from "@react-native-async-storage/async-storage";
// const {CLIENT_ID} = process.env
// const {REDIRECT_URI} = process.env

type AuthResponse = {
    params: {
        access_token: string;

    };
    type: string
}
type Param ={
    token: string
}

interface TransactionsProviderProps{
    children: ReactNode
}

type User = {
    id: string;
    given_name: string;
    email: string;
    photo?: string;
}
interface AuthContextData {
    user: User;
    signInWithGoogle(): Promise<void>;
    // signOut(): Promise<void>;
    // userStorageLoading: boolean;
  }

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({children} : TransactionsProviderProps ){
    const [user, setUser] = useState<User>({} as User);


    async function signInWithGoogle() {
        // try{
            const CLIENT_ID="83878190207-ur5m6t4ov5r0cl5od83tjgaisqban1pc.apps.googleusercontent.com"
    const REDIRECT_URI="https://auth.expo.io/@anonymous/finance-f0cf056c-c970-4d3f-8d8d-33f155b37c88"
        const RESPONSE_TYPE = 'token'
        const SCOPE = encodeURI('profile email')

        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`
       
        const response = await AuthSession
        .startAsync({ authUrl }) as AuthResponse
        console.log('response', response)

        // console.log('type', type)
        // console.log('params', params)

        
        // const token = params.access_token
        // console.log('token', token)

    
        // const response2 = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${response.params.access_token}`)
            
        // if (response.type === "success") {
        //     const userLogged = await response2.json()
        //     setUser(userLogged);
        
        //       }
        //     } catch (err) {
        //         console.log('error signInWithGoogle',err)
        //       }
    }
    


    return(
        <AuthContext.Provider value={ { user,
                                        signInWithGoogle }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext)
    return context;
}

export {AuthProvider, useAuth}