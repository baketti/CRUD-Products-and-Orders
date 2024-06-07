import { Order } from "@/db/models/Order";
import { Product } from "@/db/models/Product";
import { OrderCreateOptions } from "@/lib/orders.interfaces";

export async function insertTestOrderToDB(
    userId: number, productsIds: number[]
): Promise<void> {
    try {
        console.log("productsIds: ",productsIds);
        const order = await Order.create<Order,OrderCreateOptions>({
            userId: userId
        });       
        const productQuantities = productsIds.reduce((quantities, productId) => {
            if (!quantities[productId]) {
                quantities[productId] = 0;
            }
            quantities[productId]++;
            return quantities;
        }, {});
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
    }catch(error){
        console.error("Error while saving test order to DB: ",error);
    }
}