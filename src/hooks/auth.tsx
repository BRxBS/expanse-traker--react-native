import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from "@react-native-async-storage/async-storage";
const {CLIENT_ID} = process.env
const {REDIRECT_URI} = process.env

type AuthResponse = {
    params: {
        access_token: string;

    };
    type: string
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
    signOut(): Promise<void>;
    userStorageLoading: boolean;
  }

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({children} : TransactionsProviderProps ){
    const [user, setUser] = useState<User>({} as User);
    const [userStorageLoading, setUserStorageLoading] = useState(true);
    const userStorageKey = `@finance:transactions`

    async function signInWithGoogle() {
        try{

        const RESPONSE_TYPE = 'token'
        const SCOPE = encodeURI('profile email')

        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`
       
        const {type, params} = await AuthSession
        .startAsync({ authUrl }) as AuthResponse

        console.log('type', type)
        console.log('params', params)
    
        const response2 = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${params.access_token}`)
            
        if (type === "success") {
            const userLogged = await response2.json()
            setUser(userLogged);
            await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
        
              }
            } catch (err) {
                console.log('error signInWithGoogle',err)
              }
    }

    async function signOut(){
        setUser({} as User);
        await AsyncStorage.removeItem(userStorageKey)

    }

    useEffect(() => {
        async function loadUserStorageData() {
          const userStoraged = await AsyncStorage.getItem(userStorageKey);
          if (userStoraged) {
            const userLogged = JSON.parse(userStoraged) as User;
            setUser(userLogged);
          }
          setUserStorageLoading(false);
        }
        loadUserStorageData();
      }, []);
    

    return(
        <AuthContext.Provider 
        value={ { 
       user,
       signInWithGoogle,
       signOut,
       userStorageLoading
 }}>

            {children}

        </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext)
    return context;
}

export {AuthProvider, useAuth}