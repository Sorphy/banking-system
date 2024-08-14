import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: parseInt(process.env.DB_PORT!, 10),
    logging: false,
  }
);

/**======================SEQUELIZE CONNECTION========================== */
async function connectDB(){
    try{
        await sequelize.authenticate();
        console.log("Connection has been established successfully")
    }catch(error){
        console.log("Unable to connect to database", error)
    }
}

export { connectDB, sequelize, Sequelize, DataTypes, Model, Optional };
