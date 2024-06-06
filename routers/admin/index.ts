import e, { Router } from "express";
import { router as userRouter } from "./users";
import { router as productRouter } from "./products";
import { router as orderRouter } from "./orders";

const router = Router();

router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/orders', orderRouter);

export { router };