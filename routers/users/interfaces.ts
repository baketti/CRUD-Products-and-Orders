import { Model, CreateOptions } from 'sequelize';
import { UserRoles } from '../../db/models/User/interfaces';
import { UserAttributes } from '../../db/models/User';

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