const tasksReducer = (state = { tasks: null }, action) => {
  switch (action.type) {
    case "TASKS":
      return { ...state, tasks: action?.data };

    // case "LOGOUT":
    //   localStorage.clear();
    //   return { ...state, authData: null };

    default:
      return state;
  }
};

export default tasksReducer;
