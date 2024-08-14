import { sequelize, DataTypes, Model, Optional } from "../config/db";
import User from "./user";

interface AccountAttributes {
  id: string;
  userId: string;
  balance: number;
  accountType: "current" | "savings" | "domiciliary" | "fixed";
}

interface AccountCreationAttributes extends Optional<AccountAttributes, "id"> {}

class Account
  extends Model<AccountAttributes, AccountCreationAttributes>
  implements AccountAttributes
{
  public id!: string;
  public userId!: string;
  public balance!: number;
  public accountType!: "current" | "savings" | "domiciliary" | "fixed";

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Account.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    balance: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    accountType: {
      type: DataTypes.ENUM("current", "savings", "domiciliary", "fixed"),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "accounts",
  }
);

export default Account;
