import { Request } from "express";
import { UserRoles } from "./interfaces";
import { CreateOptions } from "sequelize";
import { OrderAttributes } from "@/db/models/Order/interfaces";

type ProductId = number;

interface OrderCreateOptions extends CreateOptions<OrderAttributes> {
    userId: number
}

interface PostOrderBodyRequest {
    productsIds: ProductId[];
}

interface OrdersQueryParams {
    //Date strings, e.g. "2024-01-20"
    insertedAt?: string;
    from?: string;
    to?: string;
    productsIds?: string[];
}

interface ExtraProperties {
    authToken: string;
    userInfo: {
        userId: number,
        userRole: UserRoles,
        iat: number
    };
    isFilteredSearch?: boolean;
    byDate?: boolean;
    byDateInterval?: boolean;
    byProducts?: boolean;
}

type GetOrdersRequest = Request<{},{},{},OrdersQueryParams> & ExtraProperties;

export { 
    OrderCreateOptions,
    PostOrderBodyRequest,
    GetOrdersRequest,
    OrdersQueryParams,
}