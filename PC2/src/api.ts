import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import type { ApiError, AuthLoginDTO, AuthTokenDTO, IUser, NewIdDTO, UserRegisterDTO } from "./types";
import axios from "axios";

const api=axios.create({baseURL:'https://aulasoporte-api.aaron-navarro.workers.dev/api'});
api.interceptors.request.use(
    (config:InternalAxiosRequestConfig)=>{
        const token=localStorage.getItem('token');
            if(token&&config.headers){
                config.headers.Authorization=`Bearer ${token}`;
            }
            return config;
            },
            (error:AxiosError)=>Promise.reject(error)
    );

api.interceptors.response.use(
    (response)=>response,
    (error:AxiosError<ApiError>)=>{
        const status = error.response?.status;
        if(status===401||status===403){
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            if(window.location.pathname!=='/login'){
                window.location.href='/login';
            }
        }
        return Promise.reject(error);
    }
)

export function errorMessage(err:unknown):string{
    if(axios.isAxiosError<ApiError>(err)){
        return (
            err.response?.data?.detail || 
            err.response?.data?.message ||
            'Error de conexión'
        );
    }
    return 'Error inesperado'
}

export const apiService={
    async register(data:UserRegisterDTO):Promise<NewIdDTO>{
        const response= await api.post<NewIdDTO>('/user/register', data);
        return response.data;
    },
    async login(data:AuthLoginDTO):Promise<AuthTokenDTO>{
        const response=await api.post<AuthTokenDTO> ('/auth/login',data);
        return response.data;
    },
    async getCurrentUser():Promise<IUser>{
        const response=await api.get<IUser>('/users/current');
        return response.data;

    },

}

export default api;