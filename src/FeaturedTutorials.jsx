import React from "react";
import { featuredTutorials } from "./data.js";
import Tutorial from "./Tutorial.jsx";

const FeaturedTutorials = () => {
  return (
    <div className="my-8 w-full ">
      <h1 className="text-center text-5xl my-4 font-bold">
        Featured Tutorials
      </h1>
      <div className="flex justify-between mx-12">
        {featuredTutorials.map((article, index) => (
          <Tutorial
            key={index}
            title={article.title}
            imageSource={article.image}
            description={article.description}
            rating={article.rating}
            author={article.author}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <button className="my-8 bg-gray-300 px-8 py-4 rounded-full mx-auto">
          See all tutorials
        </button>
      </div>
    </div>
  );
};

export default FeaturedTutorials;
