import React from "react";
import { IoStar } from "react-icons/io5";

const Article = ({ imageSource, title, description, rating, author }) => {
  return (
    <div className="max-w-[450px] flex flex-col gap-4 min-h-[500px]">
      <img className="rounded-lg" src={imageSource} />
      <h1 className="font-bold text-2xl">{title}</h1>
      <p className="text-gray-500 text-lg">
        {description.substring(0, 100) + "..."}
      </p>
      <hr className="mt-auto" />
      <div className="flex justify-between">
        <p className="flex items-center">
          {rating} <IoStar size={20} color="gold" />
        </p>
        <p className="font-bold">{author}</p>
      </div>
    </div>
  );
};

export default Article;
