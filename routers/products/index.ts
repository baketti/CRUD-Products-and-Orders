import { Router } from "express";
import { checkIdParam } from '@/middlewares';
import { Product } from "@/db/models/Product";
import { StatusCodes } from 'http-status-codes';

export const router = Router();

router.get("/", async (
    req, res
) => {
    try {
        const products = await Product.findAll<Product>()
        return res.status(StatusCodes.OK).json({
            products: products
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Error while getting products from DB:" + error
        });
    }
});

router.get("/:id",checkIdParam, async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk<Product>(id);
        if (!product) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Product not found"
            });
        }
        return res.status(StatusCodes.OK).json({
            product: product
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Error while getting product from DB:" + error
        });
    }
});