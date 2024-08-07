import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import ClipLoader from "react-spinners/ClipLoader";

const Login = () => {
  const { signIn } = UserAuth();

  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const [invalidLogin, setInvalidLogin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signIn(loginInfo.email, loginInfo.password);
      navigate("/");
    } catch (e) {
      console.log("error");
      setInvalidLogin(true);
    } finally {
      setLoading(false);
    }

    setLoginInfo({ email: "", password: "" });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [id]: value }));
  };
  return (
    <div className="min-h-screen min-w-screen bg-emerald-900 flex justify-center items-center">
      {loading ? (
        <ClipLoader size={150} color="white" />
      ) : (
        <div className="min-w-[300px] max-w-[600px] flex-grow flex flex-col items-center justify-center gap-4 bg-white rounded-xl p-8 m-4">
          <form
            className="flex flex-col justify-center w-full gap-4 text-2xl"
            onSubmit={handleSubmit}
            action="submit"
          >
            <label htmlFor="email">Your email</label>
            <input
              value={loginInfo.email}
              onChange={handleChange}
              className="p-2 border-2 rounded-lg"
              type="email"
              id="email"
            />
            <label htmlFor="password">Your Password</label>
            <input
              value={loginInfo.password}
              onChange={handleChange}
              className="p-2 border-2 rounded-lg"
              type="password"
              id="password"
            />
            <button
              className="bg-emerald-900 p-2 mt-2 rounded-xl text-white text-2xl"
              type="submit"
            >
              Login
            </button>
          </form>
          <Link to="/register" className="text-center text-gray-400 underline">
            Dont have an Account? Click here
          </Link>
          {invalidLogin && (
            <p className="text-center text-red-500">
              Incorrect email or password
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Login;
