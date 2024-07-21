import React from "react";
import { Link } from "react-router-dom";

const PostConfirmation = () => {
  return (
    <div className="w-[800px] h-[800px] bg-white rounded-2xl flex flex-col items-center justify-center">
      <h1 className="text-5xl text-emerald-900 font-bold">
        Thankyou for your post!
      </h1>
      <Link to="/" className="text-3xl text-gray-600 mt-8 underline">
        Click to return home
      </Link>
    </div>
  );
};

export default PostConfirmation;
