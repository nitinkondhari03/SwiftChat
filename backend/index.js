const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { connection } = require("./conection");
const userRoutes = require("./routes/userRoutes");
const messageRoutes=require("./routes/messagesRoutes")

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connect to  DB");
  } catch (error) {
    console.log(error.message);
  }
  console.log("Server is running");
});
