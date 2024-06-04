import { Request } from "express";

type ProductId = number;

interface PostOrderBodyRequest {
    userId: number;
    productsIds: ProductId[];
}

interface OrdersQueryParams {
    //Date strings, e.g. "2024-01-20"
    insertedAt?: string;
    from?: string;
    to?: string;
    productsIds?: string[];
}

interface GetOrdersRequest extends Request<{},{},{},OrdersQueryParams>{
    isFilteredSearch?: boolean;
    byDate?: boolean;
    byDateInterval?: boolean;
    byProducts?: boolean;
}

export { 
    PostOrderBodyRequest,
    GetOrdersRequest,
    OrdersQueryParams,
}