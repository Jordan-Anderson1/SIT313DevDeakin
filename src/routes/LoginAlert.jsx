import React from "react";
import { Link } from "react-router-dom";

const LoginAlert = () => {
  return (
    <div className="min-w-screen min-h-screen bg-emerald-900 flex justify-center p-4 items-center">
      <div className="min-w-[300px] rounded-xl min-h-[200px] m-4 p-4 bg-white">
        <h1>You need to login before viewing this content</h1>
        <Link to="/login">
          <p className="text-center mt-12 underline">Click here to login</p>
        </Link>
      </div>
    </div>
  );
};

export default LoginAlert;
