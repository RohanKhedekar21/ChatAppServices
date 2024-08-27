const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messagesRoute");

const app = express();
const socket = require("socket.io");
require("dotenv").config({ path: __dirname + "/.env" });

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`Server Started on Port ${process.env.PORT}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    origin: "http://schmooze-chat-app.s3-website.ap-south-1.amazonaws.com",
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
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });

  socket.on("user:call", async ({ to, from, offer }) => {
    console.log(">>>>user:call");
    const recieverSocket = onlineUsers.get(to);
    if (recieverSocket) {
      console.log(">>>>recieverSocket", recieverSocket);
      socket.to(recieverSocket).emit("incomming:call", { from: from, offer });
    }
  });

  socket.on("call:accepted", ({ to, ans }) => {
    const recieverSocket = onlineUsers.get(to);
    io.to(recieverSocket).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    console.log("peer:nego:needed", offer);
    const recieverSocket = onlineUsers.get(to);
    io.to(recieverSocket).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    console.log("peer:nego:done", ans);
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });
});
