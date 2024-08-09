import React from "react";
import { IoStar } from "react-icons/io5";

const TutorialPreview = ({ imageSource, title, rating, author, tags }) => {
  <div
    onClick={onClick}
    className="max-w-[450px] flex flex-col gap-4 h-[600px] hover:cursor-pointer bg-slate-100 p-4 rounded-xl shadow-lg"
  >
    <img
      className="rounded-lg w-full self-center  h-[200px] object-cover "
      src={imageSource}
    />
    <h1 className="font-bold text-2xl">{title}</h1>
    <p className="text-gray-500 text-lg ">
      {abstract.length > 100 ? abstract.substring(0, 100) + "..." : abstract}
    </p>
    <hr className="mt-auto" />
    <div className="flex justify-between">
      <p className="flex items-center">
        {rating > 0 && rating} <IoStar size={20} color="gold" />
      </p>
      <p className="font-bold">{author}</p>
    </div>
    <div className="min-h-[100px]">
      {tags &&
        tags.map((tag, index) => {
          return (
            <p
              className="bg-emerald-900 h-fit text-white p-2 inline-block m-[4px] rounded-md"
              key={index}
            >
              #{tag}
            </p>
          );
        })}
    </div>
  </div>;
};

export default TutorialPreview;
