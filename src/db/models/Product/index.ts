import { DataTypes, Model } from 'sequelize';
import { ProductAttributes, ProductCreationAttributes } from './interfaces';

  class Product extends Model<ProductAttributes,ProductCreationAttributes> {}

  const ProductAttributes = {
    id:{
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        defaultValue:'',
    },
    startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
  };

  const ProductOptions = {
    tableName: "Products",
    timestamps: false ,
  }

  async function getAllProductsIds(): Promise<number[]>{
      const products = await Product.findAll();
      return products.map(product => product.get('id')) as number[];
  }

export {
    Product,
    ProductAttributes,
    ProductOptions,
    getAllProductsIds
}