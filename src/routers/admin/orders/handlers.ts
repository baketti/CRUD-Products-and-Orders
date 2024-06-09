import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import { Order } from "@/db/models/Order";
import { Product } from "@/db/models/Product";
import { GetOrdersRequest } from "@/lib/orders.interfaces";
import { Op } from "sequelize";
import { ProductOrder } from "@/db/models/ProductOrder";

async function getAdminOrders(req: GetOrdersRequest, res: Response) {
    try {
        if(!req.isFilteredSearch){
            const orders = await Order.findAll({
                include: [{ model: Product }]
            });            
            return res.status(StatusCodes.OK).json({
                orders: orders,
            });
        }
        if(req.byDate){
            const dateStr = req.query.from;
            const startDate = new Date(dateStr);
            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 1);
            const orders = await Order.findAll({
                where: { 
                    createdAt: {
                        [Op.between]: [startDate, endDate]
                    }
                },
                include: [{ model: Product }]
            });
            return res.status(StatusCodes.OK).json({
                orders: orders,
            });
        }else if(req.byDateInterval){
            const { from, to } = req.query;
            const startDate = new Date(from);
            const endDate = new Date(to);
            const orders = await Order.findAll({
                where: { 
                    createdAt: {
                        [Op.between]: [startDate, endDate]
                    }
                },
                include: [{ model: Product }]
            });
            return res.status(StatusCodes.OK).json({
                orders: orders,
            });
        }else if(req.byProducts){
            const { productsIds } = req.query;  
            //get all orders that contain the products          
            const _orders = await ProductOrder.findAll({
                attributes: ['OrderId'],
                group: ['OrderId'],
                where: {
                    ProductId: {
                        [Op.in]: Array.isArray(productsIds) ? 
                        productsIds.map(id => parseInt(id)) : [parseInt(productsIds)]
                    }
                }
            });
            //get the orders IDs that contain the products
            const ordersIds = _orders.map(order => order.getDataValue('OrderId'));
            const orders = await Order.findAll({
                where: { 
                    id: {
                        [Op.in]: ordersIds
                    }
                },
                include: [{ model: Product }]
            })
            return res.status(StatusCodes.OK).json({
                orders: orders,
            });
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "error while getting orders from DB:" + error
        });
    }
}

async function getAdminOrdersByOrderId(req:Request, res:Response) {
    const { id } = req.params;
    try {
        const order =  await Order.findByPk<Order>(id, {
            include: [{ model: Product }]
        });
        if (!order) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Order not found"
            });
        }
        return res.status(StatusCodes.OK).json({
            order: order,       
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "error while getting order from DB:" + error
        });
    }
}

async function putAdminOrdersByOrderId(req:Request, res:Response){
    return res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
        message:"Orders cannot be updated! Delete it and create a new one instead."
    });
}

async function deleteAdminOrdersByOrderId(req:Request, res:Response){
    const { id } = req.params;
    try {
        const deleted_row = await Order.destroy<Order>({ where: { id: id } }); 
        if(!deleted_row){
            res.status(StatusCodes.NOT_FOUND).json({
                message: 'This order does not exist!'
            });
            return;
        }
        return res.status(StatusCodes.OK).json({
            message: `Order with id ${id} deleted successfully!`
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "error while deleting order from DB:" + error
        });
    }
}

export {
    getAdminOrders,
    getAdminOrdersByOrderId,
    putAdminOrdersByOrderId,
    deleteAdminOrdersByOrderId
}