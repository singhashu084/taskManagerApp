const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case "AUTH":
      localStorage.setItem("user", JSON.stringify({ ...action?.data.result }));
      return { ...state, authData: action?.data.result };

    case "LOGOUT":
      localStorage.clear();
      return { ...state, authData: null };

    default:
      return state;
  }
};

export default authReducer;
