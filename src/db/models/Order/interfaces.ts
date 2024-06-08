import { Optional } from "sequelize";

export interface OrderAttributes {
    id:number;
    userId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'|'createdAt'|'updatedAt'> {}