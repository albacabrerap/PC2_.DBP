import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { apiService, errorMessage } from "./api";
import type { UserRegisterDTO } from "./types";

export default function Register(){
    const navigate=useNavigate();
    const[form,setForm]=useState<UserRegisterDTO>({
        email:'',
        firstName:'',
        lastName:'',
        password:'',
    
    });
    
    const [error, setError]=useState<string|null> (null);
    const [success, setSuccess]=useState<string|null>(null);
    const [loading, setLoading]=useState(false); 

    const validateRegisterForm=()=>{
        const email=form.email.trim();
        const password=form.password;
        const firstName=form.firstName.trim();
        const lastName=form.lastName.trim();

        if (!email||!password||!firstName||!lastName){
            return 'llena todos los campos';
        }
        
        const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)){
            return 'ingresa un correo valido'
        }

        const caps=/^[A-Z ÁÉÍÓÚÑ]/;
        if (!caps.test(firstName)){
            return 'Nombre debe iniciar con letra mayuscula'
        }
        if (!caps.test(lastName)){
            return 'Apellido debe iniciar con letra mayuscula'
        }

        if(password.length<8){
            return 'Password debe tener al menos 8 caracteres'
        }
        return null;
    };

    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault();
        setError(null);
        setSuccess(null);
        const validationError=validateRegisterForm();
        if (validationError){
            setError(validationError);
            return;
            
        }
        setLoading(true);
        try{
            const res =await apiService.register({
                email:form.email.trim(),
                password:form.password,
                firstName:form.firstName.trim(),
                lastName:form.lastName.trim(),
            });
            setSuccess('Cuenta creada');
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
                    Crear cuenta
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
                    <div>
                        <label htmlFor="firstName">
                            firstName
                        </label>
                        <input id="firstName" name="firstName" type="firstName" placeholder="firstName" value={form.firstName} onChange={e=>setForm(prev=>({
                            ...prev, firstName:e.target.value}))}></input>
                    </div>
                    <div>
                        <label htmlFor="lastName">
                            lastName
                        </label>
                        <input id="lastName" name="lastName" type="lastName" placeholder="lastName" value={form.lastName} onChange={e=>setForm(prev=>({
                            ...prev, lastName:e.target.value}))}></input>
                    </div>
                    {error&&(
                        <div role="alert">
                            <strong>
                                Error:
                            </strong>
                            {error}
                        </div>
                    )}
                    <button type="submit" disabled={loading||!!success}>
                        {loading?'registrando':'registrate'}
                    </button>
    
                </form>
                <p>
                    con cuenta?
                    <Link to="/login" className="font-bold no-underline hover:underline">
                        login aqui
                    </Link>
                </p>
            </div>

        </div>
    )
}