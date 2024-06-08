import { Model, CreateOptions } from 'sequelize';
import { UserAttributes } from '@/db/models/User';
import { UserRoles } from './interfaces';

interface UserCreateOptions extends CreateOptions<UserAttributes> {
    id:number;
    name:string;
    surname: string;
    email: string;
    password: string;
    role?: UserRoles;
}

interface PostUserBodyRequest {
    name:string;
    surname: string;
    email: string;
    password: string;
    role?: UserRoles;
}

interface PutUserBodyRequest {
    name?:string;
    surname?: string;
    email?: string;
    password?: string;
    role?: UserRoles;
}


export {
    UserCreateOptions,
    PostUserBodyRequest,
    PutUserBodyRequest
}