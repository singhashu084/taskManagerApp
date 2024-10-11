import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasksForUser,
  updateTask,
} from "../controllers/tasks.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getAllTasksForUser);
router.post("/", auth, createTask);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);

export default router;
