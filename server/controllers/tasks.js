import { io } from "../index.js";
import Task from "../models/tasks.js";

// get all task for a user
export const getAllTasksForUser = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.userId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

// create task
export const createTask = async (req, res) => {
  const { title, description, status, dueDate, assignedTo } = req.body;
  try {
    const newTask = await Task.create({
      title,
      description,
      status,
      dueDate,
      assignedTo,
    });
    io.emit("task_created", newTask);
    res.status(200).json(newTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

// update task
export const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    io.emit("task_updated", updatedTask);
    res.status(200).json(updatedTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deleteTask = await Task.findByIdAndDelete(req.params.id);
    io.emit("task_deleted", deleteTask);
    res.status(200).json({ message: "task Deleted successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};
