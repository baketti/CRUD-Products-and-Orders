import { Model, CreateOptions } from 'sequelize';

interface ProductAttributes {
    id:number;
    name: string;
    price: number;
    description: string;
    startDate: Date;
    endDate: Date;
}

interface ProductCreateOptions extends CreateOptions<ProductAttributes> {
    name:string;
    price: number;
    description: string;
    startDate: Date;
    endDate: Date;
}

interface PostProductBodyRequest {
    name:string;
    price: number;
    description: string;
    startDate: Date;
    endDate: Date;
}

interface PutProductBodyRequest {
    name?:string;
    price?: number;
    description?: string;
    startDate?: Date;
    endDate?: Date;
}

export { 
    ProductCreateOptions,
    PostProductBodyRequest,
    PutProductBodyRequest
}