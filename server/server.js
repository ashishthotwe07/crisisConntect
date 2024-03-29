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
import path from "path";

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

const __dirname = path.resolve();


app.use("/api/auth", AuthRouter);
app.use("/api/emergency", EmergencyRoutes);
app.use("/api/volunteer", volunteerRoutes);
app.use("/api/chats", chatRouter);

io.on("connection", (socket) => {
  console.log("A client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});


const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
