import { Sequelize } from "sequelize";
import { Order, OrderAttributes, OrderOptions } from './Order';
import { User, UserAttributes, UserOptions } from './User';
import { Product, ProductAttributes, ProductOptions } from './Product';
import { ProductOrder, ProductOrderAttributes, ProductOrderOptions } from "./ProductOrder";

function  initModels(sequelize: Sequelize){
    //MODELS INITIALIZATION
    Order.init(
        OrderAttributes, {
            sequelize,
            ...OrderOptions
        }
    )

    Product.init(
        ProductAttributes, {
            sequelize,
            ...ProductOptions
        }
    )

    ProductOrder.init(
        ProductOrderAttributes, {
            sequelize,
            ...ProductOrderOptions
        }
    )

    User.init(
        UserAttributes, {
            sequelize,
            ...UserOptions
        }
    )
    //RELATIONSHIPS BETWEEN TABLES
    User.hasMany(Order, { foreignKey: 'userId' });
    Order.belongsTo(User, { foreignKey: 'userId' });
    Product.belongsToMany(Order, { through: 'ProductOrder' });
    Order.belongsToMany(Product, { through: 'ProductOrder' });
}   

export { initModels }