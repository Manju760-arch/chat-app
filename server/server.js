// server.js
import dotenv from "dotenv";
dotenv.config(); // Must be first

import express from "express";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js"; // MongoDB connection
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Socket.io setup
export const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] },
});
export const userSocketMap = {}; // store connected user sockets

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  // Broadcast online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    if (userId) delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Middleware
app.use(express.json({ limit: "10mb" })); // handle JSON + images
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  credentials: true,
}));

// Basic health check route
app.use("/api/status", (req, res) => res.send("Server is live"));

// API routes
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// Connect MongoDB
try {
  await connectDB();
  console.log("MongoDB connected successfully");
} catch (err) {
  console.error("MongoDB connection error:", err.message);
}
if(process.env.NODE_ENV !=="production"){
  // Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
}
//export server for vercel
export default server;

