import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import taskRoutes from "./routes/tasks.js";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
dotenv.config();
app.use(cors());
app.use(bodyParser.json());

app.use("/user", userRoutes);
app.use("/task", taskRoutes);

app.get("/", (req, res) => {
  res.send("hello from server");
});
const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
  console.log("new client connected", socket.id);

  socket.on("disconnect", () => {
    console.log("client disconnected", socket.id);
  });
});

mongoose
  .connect(process.env.DB_URL)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    })
  )
  .catch((err) => console.log(err.message));

httpServer.listen(5001, () => {
  console.log("running");
});

export { io };
