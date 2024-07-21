import React from "react";
import { Link } from "react-router-dom";

const header = () => {
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

      <Link
        to="/login"
        className="text-2xl font-semibold text-white flex items-center justify-center"
      >
        Login
      </Link>
    </div>
  );
};

export default header;
