import { Router } from "express";
import { checkIdParam } from '@/middlewares';
import { getProducts, getProductsByProductId } from './handlers';

export const router = Router();

router.get("/", getProducts);

router.get("/:id",checkIdParam, getProductsByProductId);