import React from "react";

const header = () => {
  return (
    <div className="bg-emerald-900 flex gap-6 p-6 text-xl">
      <h1 className="text-5xl text-white font-bold">DEV@Deakin</h1>
      <input
        type="text"
        placeholder="Search"
        className="w-full px-2 rounded-lg"
      />
      <button className="ml-auto text-2xl font-semibold text-white">
        Post
      </button>
      <button className="text-2xl font-semibold text-white">Login</button>
    </div>
  );
};

export default header;
