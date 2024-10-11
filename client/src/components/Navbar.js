import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth.authData);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  let location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token.toString());
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem("user")));
  }, [location]);

  useEffect(() => {
    navigate("/tasks");
  }, [data]);

  return (
    <nav className="bg-blue-600 p-4 shadow-md flex justify-between items-center">
      {user ? (
        <>
          <span className="text-white text-lg">Welcome, {user.name}</span>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
            onClick={logout}
          >
            Logout
          </button>
        </>
      ) : (
        <span className="text-white text-lg">Please log in</span>
      )}
    </nav>
  );
};

export default Navbar;
