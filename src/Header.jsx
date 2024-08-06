import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "./context/AuthContext";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const header = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

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
      <Link to="/" className="text-xl md:text-3xl text-white font-bold">
        DEV@Deakin
      </Link>
      <input
        type="text"
        placeholder="Search"
        className="w-full px-2 rounded-lg hidden md:inline"
      />
      <Link
        to="/post"
        className="text-2xl font-semibold text-white md:flex items-center justify-center hidden "
      >
        Post
      </Link>
      {user ? (
        <button
          onClick={handleLogout}
          className="text-2xl font-semibold text-white md:flex items-center justify-center hidden "
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

      {/* mobile views */}
      <div className="md:hidden ml-auto">
        {menuOpen ? (
          <RxCross2
            size="30"
            color="white"
            onClick={() => setMenuOpen(!menuOpen)}
          />
        ) : (
          <IoMenu
            size="30"
            color="white"
            onClick={() => setMenuOpen(!menuOpen)}
          />
        )}

        <div
          className={`absolute transition-all w-screen h-screen text-emerald-900 top-[78px] py-8 ${
            menuOpen ? "left-0  bg-white" : "-left-[200%]"
          } translate-x-0 duration-500`}
        >
          <Link
            to="/post"
            className="text-4xl font-semibold  flex items-center justify-center "
          >
            Post
          </Link>
          {user ? (
            <Link
              onClick={handleLogout}
              className="text-4xl font-semibold  flex items-center justify-center  "
            >
              Logout
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-4xl font-semibold  flex items-center justify-center"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default header;
