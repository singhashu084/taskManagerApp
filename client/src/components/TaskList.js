import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTask } from "../redux/actions/tasks";
import TaskItem from "./TaskItem";
import { socket } from "../services/socket";

const TaskList = () => {
  const dispatch = useDispatch();

  const { tasks } = useSelector((tasks) => tasks.tasks);

  useEffect(() => {
    console.log("tasks", tasks);
  }, [tasks]);

  useEffect(() => {
    dispatch(getTask());
    socket.on("task_deleted", (task) => {
      dispatch(getTask());
    });

    socket.on("task_created", (task) => {
      dispatch(getTask());
    });

    socket.on("task_updated", (task) => {
      dispatch(getTask());
    });

    return () => {
      socket.off("task_deleted");
    };
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Tasks List</h2>
      {tasks?.length > 0 ? (
        tasks.map((task, i) => <TaskItem key={i} task={task} />)
      ) : (
        <p className="text-gray-600 text-center">No tasks available!</p>
      )}
    </div>
  );
};

export default TaskList;
