import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PostOrderBodyRequest,OrderCreateOptions } from '@/lib/orders.interfaces';
import { Order } from '@/db/models/Order';
import { Product } from '@/db/models/Product';

async function postOrders (req: Request <{},{}, PostOrderBodyRequest>,res: Response) {    
    try {
        //ORDER CREATION
        const order = await Order.create<Order,OrderCreateOptions>({
            userId: req.session.userId,
        });       
        //PRODUCTS ADDITION TO THE ORDER AND QUANTITY MANAGEMENT
        const { productsIds } = req.body;
        const productQuantities = productsIds.reduce((quantities, productId) => {
            if (!quantities[productId]) {
                quantities[productId] = 0;
            }
            quantities[productId]++;
            return quantities;
        }, {});
        //ADD TO PRODUCTORDER JUNCTION TABLE
        //awaiting that all associations are done and inserted on DB
        await Promise.all(Object.keys(productQuantities).map(async(productId) => {
            const product = await Product.findByPk<Product>(productId);
            //OrderId, ProductId, product_quantity will be added to the junction table
            // @ts-ignore
            await order.addProducts(product, { 
                through: {
                    product_quantity: productQuantities[productId] 
                } 
            });
        }));                    
        //GET ORDER WITH ITS PRODUCTS AND RETURN IT
        const orderId = order.getDataValue('id');
        const orderProducts = await Order.findByPk<Order>(orderId, {
            include: [{ model: Product }]
        });
        return res.status(StatusCodes.OK).json({
            order: orderProducts,
            message: "Order registered successfully!",
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "error while saving order to DB:"+error
        });
    }
}

async function getOrdersMe(req: Request, res: Response) {
    const { userId } = req.session;
    try {
        const orders =  await Order.findAll<Order>({
            where: { userId: userId },
            include: [{ model: Product }]
        });
        if (!orders) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "You don't have orders yet"
            });
        }
        return res.status(StatusCodes.OK).json({
            orders: orders,       
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "error while getting order from DB:" + error
        });
    }
}

async function putOrdersMe(req: Request, res: Response) {
    return res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
        message:"Orders cannot be updated! Delete it and create a new one instead."
    });
}

async function deleteOrdersMe(req: Request, res: Response) {
    const { id } = req.params;
    const { userId } = req.session;
    try {
        const deleted_row = await Order.destroy<Order>({ 
            where: { id: id, userId: userId } 
        }); 
        if(!deleted_row){
            res.status(StatusCodes.NOT_FOUND).json({
                message: 'Your order does not exists!'
            });
            return;
        }
        return res.status(StatusCodes.OK).json({
            message: `Your order was deleted successfully!`
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "error while deleting order from DB:" + error
        });
    }
}

export {
    postOrders,
    getOrdersMe,
    putOrdersMe,
    deleteOrdersMe
}