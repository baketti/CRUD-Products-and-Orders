import { DataTypes, Model } from 'sequelize';
import { UserAttributes,UserCreationAttributes } from './interfaces';
import { UserRoles } from '../../../lib/interfaces';

  class User extends Model<UserAttributes, UserCreationAttributes>{}

  const UserAttributes = {
    id:{
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM(...Object.values(UserRoles)),
        defaultValue: UserRoles.USER
    }
  }

  const UserOptions = {
    tableName: "Users",
    timestamps: false 
  }

  export {
    User,
    UserAttributes,
    UserOptions
  }