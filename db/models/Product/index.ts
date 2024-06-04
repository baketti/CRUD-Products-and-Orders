import { DataTypes, Model } from 'sequelize';
import { ProductAttributes, ProductCreationAttributes } from './interfaces';

  class Product extends Model<ProductAttributes,ProductCreationAttributes> {
    public name!: string;
    public price!: number;
    public description!: string;
    public startDate!: Date;
    public endDate!: Date;
  }

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

  async function getAllProductsIds() {
    const products = await Product.findAll();
    return products.map(product => product.get('id'));
  }

export {
    Product,
    ProductAttributes,
    ProductOptions,
    getAllProductsIds
}