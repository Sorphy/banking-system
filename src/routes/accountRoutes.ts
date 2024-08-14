import { Router } from "express";
import {
  createAccount,
  getAccount,
} from "../controllers/accountController";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authenticateJWT, createAccount);
router.get("/:id", authenticateJWT, getAccount);

export default router;
