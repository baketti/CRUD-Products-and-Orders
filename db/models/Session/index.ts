import { DataTypes, Model } from 'sequelize';
import { UserRoles } from '../../../lib/interfaces';

class Session extends Model {
  public sid!: string;
  public data!: Record<string, any>;
  public expires!: Date;
  public token!: string;
  public userId!: number;
  public userRole!: UserRoles;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const SessionAttributes = {
    sid: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
    },
    data: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    expires: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(Date.now() + 1000 * 60 * 60),
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userRole: {
        type: DataTypes.ENUM(...Object.values(UserRoles)),
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
};

const SessionOptions = {
    tableName: "Sessions",
}

export {
    Session,
    SessionAttributes,
    SessionOptions
}