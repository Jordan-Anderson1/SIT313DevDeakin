import React from "react";
import { IoStar } from "react-icons/io5";

const ArticlePreview = ({
  imageSource,
  title,
  abstract = "",
  rating = "",
  author,
  onClick,
  tags = null,
}) => {
  return (
    <div
      onClick={onClick}
      className="max-w-[450px] flex flex-col gap-4 min-h-[500px] hover:cursor-pointer"
    >
      <img
        className="rounded-lg w-[400px] h-[200px] object-cover "
        src={imageSource}
      />
      <h1 className="font-bold text-2xl">{title}</h1>
      <p className="text-gray-500 text-lg">
        {abstract.length > 100 ? abstract.substring(0, 100) + "..." : abstract}
      </p>
      <hr className="mt-auto" />
      <div className="flex justify-between">
        <p className="flex items-center">
          {rating} <IoStar size={20} color="gold" />
        </p>
        <p className="font-bold">{author}</p>
      </div>
      <div className="flex gap-2">
        {tags &&
          tags.map((tag, index) => {
            return <p key={index}>#{tag}</p>;
          })}
      </div>
    </div>
  );
};

export default ArticlePreview;
