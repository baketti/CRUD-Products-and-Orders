import { Optional } from "sequelize";

export interface ProductAttributes {
    id:number;
    name: string;
    price: number;
    description: string;
    startDate: Date;
    endDate: Date;
}

export type ProductId = number;

export interface ProductCreationAttributes extends Optional<ProductAttributes, 
'id' | 'description'> {}