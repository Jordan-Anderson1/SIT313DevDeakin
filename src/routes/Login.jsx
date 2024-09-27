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
    <div className="min-w-screen flex min-h-screen items-center justify-center bg-emerald-900">
      {loading ? (
        <ClipLoader size={150} color="white" />
      ) : (
        <div className="m-4 flex min-w-[300px] max-w-[600px] flex-grow flex-col items-center justify-center gap-4 rounded-xl bg-white p-8">
          <form
            className="flex w-full flex-col justify-center gap-4 text-2xl"
            onSubmit={handleSubmit}
            action="submit"
          >
            <label htmlFor="email">Your email</label>
            <input
              value={loginInfo.email}
              onChange={handleChange}
              className="rounded-lg border-2 p-2"
              type="email"
              id="email"
            />
            <label htmlFor="password">Your Password</label>
            <input
              value={loginInfo.password}
              onChange={handleChange}
              className="rounded-lg border-2 p-2"
              type="password"
              id="password"
            />
            <button
              className="mt-2 rounded-xl bg-emerald-900 p-2 text-2xl text-white"
              type="submit"
            >
              Login
            </button>
          </form>
          <Link to="/register" className="text-center text-gray-400 underline">
            Dont have an Account? Click here
          </Link>

          <Link to="/reset-password" className="text-center text-blue-400">
            Forgot password
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
