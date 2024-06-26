import { StatusCodes } from "http-status-codes";

export interface IError {
    status: StatusCodes,
    message: string
}

export type UserInfo = {
    userId: number,
    userRole: 'admin' | 'user'//UserRoles
}

export enum UserRoles {
    ADMIN = 'admin',
    USER = 'user'
}