import { Request } from "express";
import { 
    PostProductBodyRequest, 
    ProductCreateOptions, 
    PutProductBodyRequest 
} from "@/lib/products.interfaces";
import { Product } from "@/db/models/Product";
import { StatusCodes } from "http-status-codes";

async function postAdminProducts(
    req: Request<{},{},PostProductBodyRequest>, res) {
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
}

async function putAdminProductsByProductId(
    req: Request<{ id:any },{},PutProductBodyRequest>, res){
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
            product: product,
            message: `Product with id ${id} updated successfully!`,
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "error while updating a product: " + error,
        });
    }
};

async function deleteAdminProductsByProductId(req, res){
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
};

export {
    postAdminProducts,
    putAdminProductsByProductId,
    deleteAdminProductsByProductId
}