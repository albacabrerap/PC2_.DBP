import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children}:{children:React.ReactNode}){
    const {isAuthenticated}=useAuth();
    if (!isAuthenticated||!localStorage.getItem('token')){
        return <Navigate to="/login" replace/>;
    }
    return <> {children} </>
}