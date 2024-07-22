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
    <div className="min-h-screen min-w-screen bg-emerald-900 flex justify-center items-center">
      {loading ? (
        <ClipLoader size={150} color="white" />
      ) : (
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
      )}
    </div>
  );
};

export default Register;
