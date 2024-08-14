import { Request, Response } from "express";
import Transaction from "../models/transaction";
import Account from "../models/account";
import { sequelize } from "../config/db";

// Create Transaction
export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { accountId, type, amount, description } = req.body;
    const userId = (req as any).user.userId;

    // Validate transaction type
    const validTransactionTypes = ["debit", "credit"];
    if (!validTransactionTypes.includes(type)) {
      return res.status(400).json({ error: "Invalid transaction type" });
    }

    // Check if the account exists
    const account = await Account.findByPk(accountId);
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    const transaction = await Transaction.create({
      accountId,
      type,
      amount,
      timestamp: new Date(),
      description,
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: "Error creating transaction" });
  }
};


// List Transactions for a User
export const listTransactions = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;

    // Fetch accounts for the user
    const accounts = await Account.findAll({
      where: { userId },
      attributes: ["id"], // Only fetch account IDs
    });

    // Check if any accounts are found
    if (accounts.length === 0) {
      return res.status(404).json({ error: "No accounts found for this user" });
    }

    // Extract account IDs
    const accountIds = accounts.map((account) => account.id);

    // Fetch transactions for the user's accounts
    const transactions = await Transaction.findAll({
      where: { accountId: accountIds },
      order: [["timestamp", "DESC"]], // Order transactions by timestamp
    });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Error listing transactions" });
  }
};


// Transfer
export const transfer = async (req: Request, res: Response) => {
  try {
    const { senderAcctId, receiverAcctId, amount, description } = req.body;
    const userId = (req as any).user.userId;

    // Check if both accounts exist
    const senderAccount = await Account.findByPk(senderAcctId);
    const receiverAccount = await Account.findByPk(receiverAcctId);

    if (!senderAccount) {
      return res.status(400).json({ error: "Invalid sender account" });
    }
    else if (!receiverAccount) {
      return res.status(400).json({ error: "Invalid receiver account" });
    }

    // Check if there's enough money to be sent, and also if the inputed amount is more than 0 or a valid amount.
    if (senderAccount.balance < amount) {
      return res.status(400).json({ error: "Insufficient balance" });
    } else if (amount <= 0) {
      return res.status(400).json({ error: "Invalid transfer amount" });
    }

    const transaction = await sequelize.transaction(async (t: any) => {
      // Debit from the source account
      await senderAccount.update(
        { balance: senderAccount.balance - amount },
        { transaction: t }
      );
      // Credit to the destination account
      await receiverAccount.update(
        { balance: receiverAccount.balance + amount },
        { transaction: t }
      );

      // Create transaction records
      const debitTransaction = await Transaction.create(
        {
          accountId: senderAcctId,
          type: "debit",
          amount,
          timestamp: new Date(),
          description: `Transfer to account ${receiverAcctId}: ${description}`,
        },
        { transaction: t }
      );

      const creditTransaction = await Transaction.create(
        {
          accountId: receiverAcctId,
          type: "credit",
          amount,
          timestamp: new Date(),
          description: `Transfer from account ${senderAcctId}: ${description}`,
        },
        { transaction: t }
      );
      return { debitTransaction, creditTransaction };
    });
    res
      .status(201)
      .json({ message: "Transfer successful", transaction: transaction });
  } catch (error) {
    res.status(500).json({ error: "Error processing transfer" });
  }
};
