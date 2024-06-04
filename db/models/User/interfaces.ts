import { Optional } from "sequelize";

export interface UserAttributes {
    id:number;
    name: string;
    surname: string;
    email: string;
    password: string;
    role: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export enum UserRoles {
    ADMIN = 'admin',
    USER = 'user'
  }