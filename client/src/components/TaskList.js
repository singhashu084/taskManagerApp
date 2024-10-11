import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTask } from "../redux/actions/tasks";
import TaskItem from "./TaskItem";
import { socket } from "../services/socket";

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((tasks) => tasks.tasks);

  const [filterStatus, setFilterStatus] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");

  useEffect(() => {
    dispatch(getTask());
    socket.on("task_deleted", () => dispatch(getTask()));
    socket.on("task_created", () => dispatch(getTask()));
    socket.on("task_updated", () => dispatch(getTask()));

    return () => {
      socket.off("task_deleted");
      socket.off("task_created");
      socket.off("task_updated");
    };
  }, [dispatch]);

  const filteredTasks = tasks
    ?.filter((task) => (filterStatus ? task.status === filterStatus : true))
    ?.sort((a, b) => {
      if (sortCriteria === "date") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortCriteria === "name") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Tasks List</h2>

      <div className="mb-4 flex gap-4">
        <select
          className="border p-2"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
        </select>

        <select
          className="border p-2"
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="date">Date</option>
          <option value="name">Name</option>
        </select>
      </div>

      {filteredTasks?.length > 0 ? (
        filteredTasks.map((task, i) => <TaskItem key={i} task={task} />)
      ) : (
        <p className="text-gray-600 text-center">No tasks available!</p>
      )}
    </div>
  );
};

export default TaskList;
