import React, { createContext, ReactNode, useContext, useState } from "react";
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthResponse = {
    params: {
        access_token: string;

    };
    type: string
}

interface TransactionsProviderProps{
    children: ReactNode
}

interface User{
    id: string;
    name: string;
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

        const CLIENT_ID = '83878190207-ur5m6t4ov5r0cl5od83tjgaisqban1pc.apps.googleusercontent.com'
        const REDIRECT_URI = 'https://auth.expo.io/@anonymous/finance-f0cf056c-c970-4d3f-8d8d-33f155b37c88'
        const RESPONSE_TYPE = 'token'
        const SCOPE = encodeURI('profile email')

        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`
        const result = await AuthSession
        .startAsync({ authUrl }) as AuthResponse
        // console.log('type', type)
        // console.log('params', params)

        // if(type === 'success'){
        //     navigation.navigate('Listagem',)

        // }
      if (result.type === "success") {
        const userLogged = {
        //   id: String(result.user.id),
        //   email: result.user.email!,
        //   name: result.user.name!,
        //   photo: result.user.photoUrl!,
        } as User;
        setUser(userLogged);
        // await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }
 
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