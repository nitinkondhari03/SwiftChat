const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { connection } = require("./conection");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messagesRoutes");
const socket = require("socket.io");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connect to  DB");
  } catch (error) {
    console.log(error.message);
  }
  console.log("Server is running");
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
