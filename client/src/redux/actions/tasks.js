import * as api from "../../services/api";

export const createTask = (newTask) => async (dispatch) => {
  try {
    const { data } = await api.createTask(newTask);
  } catch (error) {
    console.log(error);
  }
};

export const getTask = () => async (dispatch) => {
  try {
    const { data } = await api.getTasks();
    dispatch({ type: "TASKS", data });
  } catch (error) {
    console.log(error);
  }
};
