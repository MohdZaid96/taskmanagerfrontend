import React, { useContext, useState } from 'react';
import { createContext } from 'react';

const iniAuth={
    isAuth : false,
    displayTask:false,
    email:"",
    name:""
}

export const AuthContext=createContext();

export const AuthContextApi=({children})=>{
    const [authState,setAuthState]=useState(iniAuth);

    const login=()=>{
        setAuthState({
            ...authState,
            isAuth:true,

        })
    }
    const logout=()=>{
        localStorage.clear();
        setAuthState({
            ...authState,
            isAuth:false,
            name:false
            
        })
    }
    return (
        <AuthContext.Provider value={{authState,login,logout,setAuthState}}>
            {children}
        </AuthContext.Provider>
      )
}

