import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "./context/AuthContext";

const header = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
      console.log("You have logged out");
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div className="bg-emerald-900 flex gap-6 p-6 text-xl sticky top-0 z-50">
      <Link to="/" className="text-5xl text-white font-bold">
        DEV@Deakin
      </Link>
      <input
        type="text"
        placeholder="Search"
        className="w-full px-2 rounded-lg"
      />
      <Link
        to="/post"
        className="text-2xl font-semibold text-white flex items-center justify-center"
      >
        Post
      </Link>
      {user ? (
        <button
          onClick={handleLogout}
          className="text-2xl font-semibold text-white flex items-center justify-center"
        >
          Logout
        </button>
      ) : (
        <Link
          to="/login"
          className="text-2xl font-semibold text-white flex items-center justify-center"
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default header;
