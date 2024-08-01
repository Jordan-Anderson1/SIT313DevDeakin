import React from "react";
import { featuredArticles } from "./data.js";
import ArticlePreview from "./ArticlePreview.jsx";
import { useNavigate, Link } from "react-router-dom";

const FeaturedArticles = () => {
  const navigate = useNavigate();
  return (
    <div className="my-8 w-full ">
      <h1 className="text-center text-5xl my-4 font-bold">Featured Articles</h1>
      <div className="flex justify-between mx-12">
        {featuredArticles.map((article, index) => (
          <ArticlePreview
            onClick={useNavigate("/article/")}
            key={index}
            title={article.title}
            imageSource={article.image}
            abstract={article.abstract}
            rating={article.rating}
            author={article.author}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <Link
          to="/all-articles"
          className="my-8 bg-gray-300 px-8 py-4 rounded-full mx-auto"
        >
          See all articles
        </Link>
      </div>
    </div>
  );
};

export default FeaturedArticles;
