import { Router } from "express";
import {
  createTransaction,
  listTransactions,
  transfer,
} from "../controllers/transactionController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authenticateJWT, createTransaction);
router.get("/", authenticateJWT, listTransactions);
router.post("/transfer", authenticateJWT, transfer);

export default router;
