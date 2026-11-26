import React, { createContext, use, useEffect, useState } from "react";
import { apiService } from "./api";
import type { IUser } from "./types";

interface AuthContextType{
    token:string | null;
    user:IUser | null;
    loadingUser:boolean;
    isAuthenticated:boolean;
    loginWithToken:(newToken:string)=>Promise<IUser>;
    logout:()=>void;
}

const AuthContext = createContext<AuthContextType | undefined> (undefined);

export const AuthProvider:React.FC<{children:React.ReactNode}>=({children})=>{
    const [token,setToken]=useState<string|null>(()=>localStorage.getItem('token'));
    const [user,setUser]=useState<IUser|null> (null);
    const [loadingUser,setLoadingUser]=useState<boolean>(!!localStorage.getItem('token'));
    useEffect(()=>{
        let cancelled=false;
        if(!token){
            setUser(null);
            setLoadingUser(false);
            return;
        }

        setLoadingUser(true);
        apiService.getCurrentUser().then(profile=>{if(!cancelled){setUser(profile);}}).catch(()=>{
            if (!cancelled){
                localStorage.removeItem('token');
                setToken(null);
                setUser(null);
            }
        }).finally(()=>{
            if(!cancelled){
                setLoadingUser(false);
            }
        });
        return ()=>{cancelled=true;};}, [token]);

    
    const loginWithToken=async(newToken:string):Promise<IUser>=>{
        localStorage.setItem('token',newToken);
        setToken(newToken);
        const profile=await apiService.getCurrentUser();
        setUser(profile);
        return profile;
    };

    const logout=()=>{
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{token,user,loadingUser,isAuthenticated: !!token, loginWithToken,logout,}}>
            {children}
        </AuthContext.Provider>
    );
};

