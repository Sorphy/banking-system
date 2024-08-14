import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { validateName } from "../utils/validation";
import { sendEmail, emailContent } from "../utils/emailNotifUtils";

const jwtSecret = process.env.JWT_SECRET as string;

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Ensure the name is a valid name
    if (!validateName(name)) {
      return res.status(400).json({ error: "Invalid name format. Kindly input your first name and surname, and you may add your middle name." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user.id }, jwtSecret, {
      expiresIn: "1h",
    });
    // Send notification email after successful login
    const { subject, html } = emailContent(user.name);
    await sendEmail(user.email, subject, html);
    
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
};

export const getMe = (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  jwt.verify(token, jwtSecret, async (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid token" });

    const user = await User.findByPk((decoded as any).userId);
    res.json(user);
  });
};
