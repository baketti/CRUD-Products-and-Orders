import { DataTypes, Model } from 'sequelize';

  //PRODUCTORDER TABLE IS A JOIN TABLE BETWEEN PRODUCT AND ORDER, CREATED BY DEFAULT BY SEQUELIZE
  //TO ADD A NEW ATTRIBUTE TO THE JUNCTION TABLE, WE MUST DEFINE THE MODEL EXPLICITLY
  class ProductOrder extends Model {
    /*
    DEFAULT ATTRIBUTES:
    - OrderId
    - ProductId 
    */
    public product_quantity!: number;
  }

  const ProductOrderAttributes = {
    product_quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
  };

  const ProductOrderOptions = {
    tableName: "ProductOrder",
    timestamps: false
  }

  export {
    ProductOrder,
    ProductOrderAttributes,
    ProductOrderOptions
  }