import React from "react";
import { featuredArticles } from "./data.js";
import Article from "./Article";

const FeaturedArticles = () => {
  return (
    <div className="my-8 w-full ">
      <h1 className="text-center text-5xl my-4 font-bold">Featured Articles</h1>
      <div className="flex justify-between mx-12">
        {featuredArticles.map((article, index) => (
          <div>
            <Article
              key={index}
              title={article.title}
              imageSource={article.image}
              description={article.description}
              rating={article.rating}
              author={article.author}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button className="my-8 bg-gray-300 px-8 py-4 rounded-full mx-auto">
          See all articles
        </button>
      </div>
    </div>
  );
};

export default FeaturedArticles;
