import * as api from "../../services/api";

export const createTask = (newTask) => async (dispatch) => {
  try {
    const { data } = await api.createTask(newTask);
    console.log("data777", data);
    // localStorage.setItem("token", data.token);
    // dispatch({ type: "AUTH", data });
  } catch (error) {
    console.log(error);
  }
};

export const getTask = () => async (dispatch) => {
  try {
    const { data } = await api.getTasks();
    console.log("data123", data);
    dispatch({ type: "TASKS", data });
  } catch (error) {
    console.log(error);
  }
};