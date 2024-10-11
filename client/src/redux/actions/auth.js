import * as api from "../../services/api";

export const signin = (formData) => async (dispatch) => {
  try {
    const { data } = await api.signin(formData);
    localStorage.setItem("token", data.token);
    dispatch({ type: "AUTH", data });
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData) => async (dispatch) => {
  try {
    const { data } = await api.signup(formData);
    localStorage.setItem("token", data.token);
    dispatch({ type: "AUTH", data });
  } catch (error) {
    console.log(error);
  }
};
