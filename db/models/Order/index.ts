import { DataTypes } from 'sequelize';
import { Model } from 'sequelize'
import { OrderAttributes,OrderCreationAttributes } from './interfaces';

class Order extends Model<OrderAttributes, OrderCreationAttributes> {
    //public userId!: number;
}

const OrderAttributes = {
        id:{
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
    };

const OrderOptions = {
    tableName: "Orders",
}

export {
    Order,
    OrderAttributes,
    OrderOptions
}

    