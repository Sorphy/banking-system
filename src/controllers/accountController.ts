import { Request, Response } from "express";
import Account from "../models/account";
import { ValidationError } from "sequelize";

// Create Account
export const createAccount = async (req: Request, res: Response) => {
  try {
    const { balance, accountType } = req.body;
    const userId = (req as any).user.userId;

    // Validate account type
    const validAccountTypes = [
      "savings",
      "current",
      "fixed",
      "domiciliary",
    ];
    if (!validAccountTypes.includes(accountType)) {
      return res.status(400).json({ error: "Invalid account type" });
    }

    // Create the account
    const account = await Account.create({ userId, balance, accountType });
    res.status(201).json(account);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error creating account" });
    }
  }
};

// Get Account
export const getAccount = async (req: Request, res: Response) => {
  try {
    const account = await Account.findByPk(req.params.id);

    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    res.json(account);
  } catch (error) {
    res.status(500).json({ error: "Error fetching account" });
  }
};
