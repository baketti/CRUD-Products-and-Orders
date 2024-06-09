import { Request, Response } from "express";
import { Product } from "@/db/models/Product";
import { StatusCodes } from 'http-status-codes';

async function getProducts(req: Request, res: Response) {
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
}

async function getProductsByProductId(req: Request, res: Response) {
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
}

export {
    getProducts,
    getProductsByProductId
}