import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext.jsx";
import { createDocForNewUser } from "../utils/firebase";
import ClipLoader from "react-spinners/ClipLoader";

const Register = () => {
  const { createUser } = UserAuth();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [contact, setContact] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //handle updating form feilds
  const handleChange = (e) => {
    const { id, value } = e.target;
    setContact({ ...contact, [id]: value });
  };

  //submit form logic. Create a firebase user. Creates a document for user in firestore.
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      contact.password === contact.confirmPassword &&
      contact.password !== ""
    ) {
      try {
        setLoading(true);
        const { user } = await createUser(contact.email, contact.password);
        await createDocForNewUser(contact.name, contact.email, user.uid);
        navigate("/");
      } catch (e) {
        alert(e.message);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Passwords must match and be at least 6 characters.");
    }
  };
  return (
    <div className="min-w-screen flex min-h-screen items-center justify-center bg-emerald-900">
      {loading ? (
        <ClipLoader size={150} color="white" />
      ) : (
        <div className="m-4 flex min-w-[300px] max-w-[600px] flex-grow flex-col gap-4 rounded-xl bg-white p-8">
          <h1 className="mb-4 text-center text-lg font-bold text-emerald-900 md:text-4xl">
            Create a DEV@Deakin Account
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-6 text-lg md:text-2xl"
          >
            <div className="flex items-center">
              <label htmlFor="name">Name</label>
              <input
                value={contact.name}
                onChange={handleChange}
                className="ml-4 flex-1 rounded-lg border-2 p-2"
                type="text"
                id="name"
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="email">Email</label>
              <input
                value={contact.email}
                onChange={handleChange}
                className="ml-4 flex-1 rounded-lg border-2 p-2"
                type="email"
                id="email"
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="password">Password</label>
              <input
                value={contact.password}
                onChange={handleChange}
                className="ml-4 flex-1 rounded-lg border-2 p-2"
                type="password"
                id="password"
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="confirmPassword">
                Confirm <br />
                Password
              </label>
              <input
                value={contact.confirmPassword}
                onChange={handleChange}
                className="ml-4 flex-1 rounded-lg border-2 p-2"
                type="password"
                id="confirmPassword"
              />
            </div>
            <button
              className="mt-2 rounded-xl bg-emerald-900 p-2 text-2xl text-white"
              type="submit"
            >
              Register
            </button>
          </form>
          <Link to="/login" className="text-center text-gray-400 underline">
            Already have an account? Click here
          </Link>
        </div>
      )}
    </div>
  );
};

export default Register;
