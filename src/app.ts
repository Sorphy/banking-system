import express from "express";
import { sequelize, connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes";
import accountRoutes from "./routes/accountRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import dotenv from "dotenv";
import logger from "morgan";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(logger("dev"));
app.use(
  cors({
    origin: "*", //allow all origin *
  })
);

app.use("/auth", authRoutes);
app.use("/accounts", accountRoutes);
app.use("/transactions", transactionRoutes);

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  try {
      await connectDB();
      await sequelize.sync({ force: false }).then(() => {
        console.log("Database synced successfully");
        console.log(`Server is running on port ${port}`);
      });
  } catch (err) {
    console.error("Error starting the server:", err);
  }
});
export default app;
