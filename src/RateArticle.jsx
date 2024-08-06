import React, { useState } from "react";
import { IoStar } from "react-icons/io5";
import { updateArticleRating } from "./utils/firebase";

const RateArticle = ({ id }) => {
  const [rating, setRating] = useState();
  const [submitted, setSubmitted] = useState(false);

  const handleClick = (rating) => {
    setRating(rating);
    console.log(rating);
  };

  const handleSubmit = async () => {
    try {
      {
        rating && (await updateArticleRating(id, rating));
      }
      console.log("Rating submitted successfully");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl ">Rate this article</h1>
      <div className="flex gap-4">
        {Array(5)
          .fill()
          .map((element, index) => {
            return (
              <IoStar
                key={index}
                size={60}
                color={`${index <= rating - 1 ? "gold" : "gray"}`}
                className="cursor-pointer hover:scale-125"
                onClick={() => handleClick(index + 1)}
              />
            );
          })}
      </div>
      <button
        onClick={handleSubmit}
        className="bg-emerald-900 text-white text-2xl p-4 rounded-xl "
      >
        Submit Rating
      </button>
    </div>
  );
};

export default RateArticle;
