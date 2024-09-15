const { Server } = require("socket.io");
const socketEvents = require("../socket");

let io; // Socket Instance

global.onlineUsers = new Map(); // Global Variable for active socket users

const setupSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      // origin: "http://schmooze-chat-app.s3-website.ap-south-1.amazonaws.com",
      credentials: true, // Allow cookies and authentication headers
    },
  });

  io.on("connection", (socket) => {
    console.log("User Connected", socket.id);

    socketEvents(socket);

    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });

  // socketEvents(io);
};

module.exports = { setupSocket, io };
