import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import mongoose from "mongoose";



dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  console.log("Connected DB:", mongoose.connection.name);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
  });
};

startServer();
