export interface AuthTokenDTO{
    token:string;
}

export interface NewIdDTO{
    id:number;
}

export interface UserRegisterDTO{
    email:string;
    firstName:string;
    lastName:string;
    password:string;
}

export interface ApiError{
    detail?:string;
    message?:string;
}

export interface AuthLoginDTO{
    email:string;
    password:string;
}


export interface IUser{
    id:number;
    username:string;
    email:string;
    firstName:string;
    lastName:string;
    role: 'USER' |'ADMIN';
}

