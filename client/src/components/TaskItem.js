import React, { useState } from "react";
import { deleteTask } from "../services/api";
import TaskForm from "./TaskForm";

const TaskItem = ({ task }) => {
  console.log("task00000000", task);
  const [isEditing, setIsEditing] = useState(false);
  const deleteHandler = (id) => {
    deleteTask(task._id);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center">
      {!isEditing ? (
        <>
          <div className="flex flex-col mb-4 md:mb-0">
            <h3 className="text-xl font-semibold text-gray-800">
              {task.title}
            </h3>
            <p className="text-gray-600">{task.description}</p>
            <p className="text-gray-600 text-sm">
              Due Date:{new Date(task.dueDate).toLocaleDateString()}
            </p>
            <p
              className={`text-sm font-medium ${
                task.status === "completed"
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            >
              Status:{task.status}
            </p>
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-1"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-1"
              onClick={deleteHandler}
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <TaskForm taskId={task} setIsEditing={setIsEditing} />
      )}
    </div>
  );
};

export default TaskItem;
