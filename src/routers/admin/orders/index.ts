import { Router } from "express";
import { checkQueryStringParams, getOrdersQueryParamsValidation } from "./validations";
import { checkIdParam } from "@/middlewares";
import {    
    getAdminOrders,
    getAdminOrdersByOrderId,
    putAdminOrdersByOrderId,
    deleteAdminOrdersByOrderId
}from './handlers';

export const router = Router();

router.get('/', getOrdersQueryParamsValidation, checkQueryStringParams, getAdminOrders);

router.get('/:id', checkIdParam, getAdminOrdersByOrderId);

router.put('/:id', putAdminOrdersByOrderId);

router.delete('/:id', checkIdParam, deleteAdminOrdersByOrderId);