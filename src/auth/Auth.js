import { createContext, useEffect, useState } from "react";
import {getUserLocalStorage, LoginRequest, setUserLocalStorage} from './util'
import http from "../api/api";



export const AuthContext = createContext({});

export function AuthProvider({children}){
    const [user, setUser] = useState();
    useEffect(()=> {
        
        const User = getUserLocalStorage();
        if(User) {
            setUser(User);
        }

    },[]);

    async function VerifyLoggin (){
        const User = getUserLocalStorage();
        try {
            await http.post('auth/free',{
                token: User?.token
            });
            console.log('Autorizado!');
            return true;
        } catch (error) {
            return false;
        }
    }
    async function authenticate(email, password){
        const response = await LoginRequest(email, password);
        const payload = {token: response?.data, email};
        setUser(payload);
        setUserLocalStorage(payload);
        return response?.status;
    }
    function logout(){
        setUser(null);
        setUserLocalStorage(null);
    }

    return (<AuthContext.Provider value={{...user, VerifyLoggin, authenticate, logout}}>{[children]}</AuthContext.Provider>)
}

