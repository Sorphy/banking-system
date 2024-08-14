import { sequelize, DataTypes, Model, Optional } from "../config/db";
import Account from "./account";

interface TransactionAttributes {
  id: string;
  accountId: string;
  type: "debit" | "credit";
  amount: number;
  timestamp: Date;
  description?: string;
}

interface TransactionCreationAttributes
  extends Optional<TransactionAttributes, "id"> {}

class Transaction
  extends Model<TransactionAttributes, TransactionCreationAttributes>
  implements TransactionAttributes
{
  public id!: string;
  public accountId!: string;
  public type!: "debit" | "credit";
  public amount!: number;
  public timestamp!: Date;
  public description?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Transaction.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    accountId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Account,
        key: "id",
      },
    },
    type: {
      type: DataTypes.ENUM("debit", "credit"),
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: "transactions",
  }
);

export default Transaction;
