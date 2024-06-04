import { Request, Router } from "express";
import {
    ProductCreateOptions,
    PostProductBodyRequest,
    PutProductBodyRequest
} from './interfaces';
import { 
    checkIdParam,
    checkBody,
} from '../../middlewares';
import{
    postProductValidation,
    putProductValidation
} from './validations';
import { Product } from "../../db/models/Product";
import { StatusCodes } from 'http-status-codes';

//TODO: types of req and res
//CHIEDERE A MANCINI COME FARE PER FAR TESTARE A TERZI IL MIO CODICE CON IL DB
export const router = Router();

router.post("/products",checkBody,postProductValidation, async (
    req: Request<{},{},PostProductBodyRequest>, res) => {
    try {
        const new_product = await Product.create<Product,ProductCreateOptions>({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        });
        return res.status(StatusCodes.OK).json({
            product: new_product,
            message: "Product inserted successfully!"
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Error while inserting a product into database:" + error
        });
    }
});

router.get("/products", async (
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

router.get("/products/:id",checkIdParam, async (req, res) => {
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

router.put("/products/:id",checkIdParam,checkBody,putProductValidation, async (
    req: Request<{ id:any },{},PutProductBodyRequest>, res) => {
    const { id } = req.params;
    try {
        const updated_product = await Product.update<Product>(req.body, {
            where: { id : id}
        })
        if(!updated_product){
            res.status(StatusCodes.NOT_FOUND).json({
                message: 'This product does not exists!'
            })
        }
        const product = await Product.findByPk<Product>(id);
        return res.status(StatusCodes.OK).json({
            message: `Product with id ${id} updated successfully!`,
            product: product,
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "error while updating a product: " + error,
        });
    }
});

router.delete("/products/:id",checkIdParam, async (req, res) => {
    const { id } = req.params;
    try {
        const deleted_row = await Product.destroy<Product>(({ where: { id: id } }))
        if(!deleted_row){
            res.status(StatusCodes.NOT_FOUND).json({
                message: 'This product does not exists!'
            });
            return;
        }
        return res.status(StatusCodes.OK).json({
            message: `Product with id ${id} deleted successfully!`,
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Error while deleting a product: ' + error,
        });
    }
});