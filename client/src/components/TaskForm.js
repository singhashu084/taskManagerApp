import React, { useEffect, useLayoutEffect, useState } from "react";
import { createTask, getTask } from "../redux/actions/tasks";
import { useDispatch } from "react-redux";
import { getAllUsers, updateTask } from "../services/api";

const TaskForm = ({ taskId }) => {
  console.log("taskId", taskId);
  const [formData, setFormData] = useState({
    title: taskId ? taskId.title : "",
    description: taskId ? taskId.description : "",
    dueDate: taskId ? taskId.dueDate : "",
    assignedTo: taskId ? taskId.assignedTo : "",
    status: taskId ? taskId.status : "",
  });
  const [otherUsers, setOtherUsers] = useState([]);
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (taskId) {
        updateTask(taskId, formData);
      } else {
        dispatch(createTask(formData));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFormData({
        title: "",
        description: "",
        dueDate: "",
        assignedTo: "",
        status: "",
      });
    }
  };

  useEffect(() => {
    getAllUsers().then((data) => {
      const arr = data.data.result;
      setOtherUsers(arr);
    });
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
      >
        <div className="mb-4">
          <label className="text-gray-700 text-sm mb-2 font-bold">Title</label>
          <input
            type="text"
            onChange={handleChange}
            name="title"
            value={formData.title}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label className="text-gray-700 text-sm mb-2 font-bold">
            Description
          </label>
          <input
            type="text"
            onChange={handleChange}
            name="description"
            value={formData.description}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label className="text-gray-700 text-sm mb-2 font-bold">
            Due date
          </label>
          <input
            type="date"
            onChange={handleChange}
            name="dueDate"
            value={formData.dueDate}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div>
          <label className="text-gray-700 text-sm mb-2 font-bold">
            Assign to:
          </label>
          <select
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            {otherUsers.map((user, i) => (
              <option key={i} value={user._id}>
                {user._id !== currentUser._id
                  ? user.name
                  : `${user.name} (You)`}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-gray-700 text-sm mb-2 font-bold">
            Status:
          </label>
          <select
            name="status"
            value={taskId ? formData.status : "pending"}
            onChange={handleChange}
            disabled={!taskId}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value={"pending"}> Pending</option>
            <option value={"in progress"}> In Progress</option>
            <option value={"completed"}> Completed</option>
          </select>
        </div>
        <div className="my-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            {taskId ? "Update Task" : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
