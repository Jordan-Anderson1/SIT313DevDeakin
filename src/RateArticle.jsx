import React, { useState, useEffect } from "react";
import { IoStar } from "react-icons/io5";
import {
  addUserToRatingList,
  getUsersWhoRatedArticle,
  updateArticleRating,
} from "./utils/firebase";
import { UserAuth } from "./context/AuthContext";

const RateArticle = ({ id }) => {
  const [rating, setRating] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [hasRated, setHasRated] = useState(false);
  const { user } = UserAuth();

  useEffect(() => {
    const checkUserRating = async () => {
      try {
        const users = await getUsersWhoRatedArticle(id);
        if (user && users.includes(user.uid)) {
          setHasRated(true);
        } else {
          setHasRated(false);
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    if (user) {
      checkUserRating();
    }
  }, [id, user]);

  const handleClick = (rating) => {
    setRating(rating);
  };

  const handleSubmit = async () => {
    if (hasRated) {
      alert("You have already rated this article");
      return;
    }
    try {
      {
        rating && (await updateArticleRating(id, rating));
        setSubmitted(true);
        addUserToRatingList(id, user.uid);
      }
      console.log("Rating submitted successfully");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full h-[180px] p-6 bg-emerald-600 ">
      {submitted ? (
        <div>
          <p className="text-lg text-white">
            Thank you for rating this article!
          </p>
        </div>
      ) : (
        <>
          <h1 className="text-2xl text-white font-semibold">
            Rate this article
          </h1>
          <div className="flex gap-4">
            {Array(5)
              .fill()
              .map((element, index) => {
                return (
                  <IoStar
                    key={index}
                    size={40}
                    color={`${index <= rating - 1 ? "gold" : "gainsboro"}`}
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
        </>
      )}
    </div>
  );
};

export default RateArticle;
