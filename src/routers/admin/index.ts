import { Router } from "express";
import { router as usersRouter } from "./users";
import { router as productsRouter } from "./products";
import { router as ordersRouter } from "./orders";

const router = Router();

router.use('/users', usersRouter);
router.use('/products', productsRouter);
router.use('/orders', ordersRouter);

export { router };