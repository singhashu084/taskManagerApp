import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={Signup} />
        <Route exact path="/" Component={Login} />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <TaskForm />
              <TaskList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
