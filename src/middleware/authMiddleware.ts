import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET as string; // Use environment variables in production

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    (req as any).user = user;
    next();
  });
};
