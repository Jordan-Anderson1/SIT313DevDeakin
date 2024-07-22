import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext.jsx";

const Register = () => {
  const { createUser } = UserAuth();

  const navigate = useNavigate();

  const [contact, setContact] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setContact({ ...contact, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(contact.email, contact.password);
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
    setContact({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    console.log("Submitted form");
  };
  return (
    <div className="min-h-screen min-w-screen bg-emerald-900 flex justify-center items-center">
      <div className="min-w-[800px] flex flex-col gap-4 bg-white rounded-xl p-8">
        <h1 className="text-center text-4xl text-emerald-900 font-bold mb-4">
          Create a DEV@Deakin Account
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-6 text-2xl"
        >
          <div className="flex">
            <label htmlFor="name">Name</label>
            <input
              value={contact.name}
              onChange={handleChange}
              className="w-[450px] ml-auto border-2 p-2 rounded-lg"
              type="text"
              id="name"
            />
          </div>
          <div className="flex">
            <label htmlFor="email">Email</label>
            <input
              value={contact.email}
              onChange={handleChange}
              className="w-[450px] ml-auto border-2 p-2 rounded-lg"
              type="email"
              id="email"
            />
          </div>
          <div className="flex">
            <label htmlFor="password">Password</label>
            <input
              value={contact.password}
              onChange={handleChange}
              className="w-[450px] ml-auto border-2 p-2 rounded-lg"
              type="password"
              id="password"
            />
          </div>
          <div className="flex">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              value={contact.confirmPassword}
              onChange={handleChange}
              className="w-[450px] ml-auto border-2 p-2 rounded-lg"
              type="password"
              id="confirmPassword"
            />
          </div>
          <button
            className="bg-emerald-900 p-2 mt-2 rounded-xl text-white text-2xl"
            type="submit"
          >
            Register
          </button>
        </form>
        <Link to="/login" className="text-center text-gray-400 underline">
          Already have an account? Click here
        </Link>
      </div>
    </div>
  );
};

export default Register;
