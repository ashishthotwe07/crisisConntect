import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import AuthRouter from "./routes/auth.routes.js";
import EmergencyRoutes from "./routes/emergency.routes.js";
import volunteerRoutes from "./routes/volunteer.routes.js";
import chatRouter from "./routes/chat.routes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

connectDB();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the homepage!");
});

app.use("/api/auth", AuthRouter);
app.use("/api/emergency", EmergencyRoutes);
app.use("/api/volunteer", volunteerRoutes);
app.use('/api/chats', chatRouter);
io.on("connection", (socket) => {
  console.log("A client connected");
  // Add Socket.IO event handlers here
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
