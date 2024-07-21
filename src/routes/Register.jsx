import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="min-h-screen min-w-screen bg-emerald-900 flex justify-center items-center">
      <div className="min-w-[800px] flex flex-col gap-4 bg-white rounded-xl p-8">
        <h1 className="text-center text-4xl text-emerald-900 font-bold mb-4">
          Create a DEV@Deakin Account
        </h1>
        <form className="w-full flex flex-col gap-6" action="submit">
          <div className="flex">
            <label htmlFor="name">Name</label>
            <input
              className="w-[450px] ml-auto border-2 p-2 rounded-lg"
              type="text"
              id="name"
            />
          </div>
          <div className="flex">
            <label htmlFor="email">Email</label>
            <input
              className="w-[450px] ml-auto border-2 p-2 rounded-lg"
              type="email"
              id="email"
            />
          </div>
          <div className="flex">
            <label htmlFor="password">Password</label>
            <input
              className="w-[450px] ml-auto border-2 p-2 rounded-lg"
              type="password"
              id="password"
            />
          </div>
          <div className="flex">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              className="w-[450px] ml-auto border-2 p-2 rounded-lg"
              type="password"
              id="confirmPassword"
            />
          </div>
        </form>
        <Link to="/login" className="text-center text-gray-400 underline">
          Already have an account? Click here
        </Link>
      </div>
    </div>
  );
};

export default Register;
