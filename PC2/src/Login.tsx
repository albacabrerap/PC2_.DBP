import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { apiService, errorMessage } from "./api";
import { useAuth } from "./AuthContext";
import type { AuthLoginDTO } from "./types";

export default function Login(){
    const {isAuthenticated,loginWithToken}=useAuth();
    const navigate=useNavigate();
    const[form,setForm]=useState<AuthLoginDTO>({
        email:'',
        password: '',
    
    });
    
    const [error, setError]=useState<string|null> (null);
    const [loading, setLoading]=useState(false); 
    if (isAuthenticated){
        return <Navigate to ="/mainpage" replace/>;
    };
    const validateLoginForm=()=>{
        const email=form.email.trim();
        const password=form.password;
        if (!email||!password){
            return 'ingresa correo o contraseña';
        }
        
        const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)){
            return 'ingresa un correo valido'
        }
        return null;
    };

    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault();
        setError(null);
        const validationError=validateLoginForm();
        if (validationError){
            setError(validationError);
            return;
            
        }
        setLoading(true);
        try{
            const {token}=await apiService.login({
                email:form.email.trim(),
                password: form.password,
            });
            await loginWithToken(token);
            navigate('/mainpage');
        }

        catch(err){
            setError(errorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center px-[1.25rem] py-[3rem]">
            <div className="w-full max-w-[460px] rounded-[5px] px-[2rem] py-[2.25rem] shadow-md border flex flex-col gap-[1.5rem]">
                <h1 className="text-[2rem] font-extrabold text-center mb-[0.25rem] tracking-[-0.02em]">
                    Iniciar Sesion
                </h1>
                <form onSubmit={handleSubmit} noValidate className="border rounded-[5px] px-[1.5rem] py-[1.75rem] shadow-sm flex flex-col gap-[1.25rem]">
                    <div>
                        <label htmlFor="email">
                            mail
                        </label>
                        <input id="email" name="email" type="email" placeholder="email@gmail.com" value={form.email} onChange={e=>setForm(prev=>({
                            ...prev, email:e.target.value}))}></input>
                    </div>
                    <div>
                        <label htmlFor="password">
                            password
                        </label>
                        <input id="password" name="password" type="password" placeholder="**********" value={form.password} onChange={e=>setForm(prev=>({
                            ...prev, password:e.target.value}))}></input>
                    </div>
                    {error&&(
                        <div role="alert">
                            <strong>
                                Error:
                            </strong>
                            {error}
                        </div>
                    )}
                    <button type="submit" disabled={loading}>
                        {loading?'iniciando sesion':'inicia sesion'}
                    </button>
    
                </form>
                <p>
                    sin cuenta?
                    <Link to="/register" className="font-bold no-underline hover:underline">
                        registrate aqui 
                    </Link>
                </p>
            </div>

        </div>
    )
}