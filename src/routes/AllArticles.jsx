import React, { useState, useEffect } from "react";
import { getArticleData, getArticleImage } from "../utils/firebase";
import ArticlePreview from "../ArticlePreview";
import { useNavigate } from "react-router-dom";

const AllArticles = () => {
  const [articles, setArticles] = useState([]);

  const getArticleRating = (ratings) => {
    const total = ratings.reduce((acc, current) => {
      return acc + current;
    }, 0);

    return Math.ceil(total / ratings.length);
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticleData();
        setArticles(data);
      } catch (e) {
        console.log(e.message);
        setArticles([]);
      }
    };

    fetchArticles();
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <h1 className="text-5xl text-center my-6 font-semibold">
        All DEV@Deakin Articles
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-4 justify-center">
        {articles.map((article, index) => (
          <ArticlePreview
            onClick={() => navigate(`/article/${article.id}`)}
            key={index}
            title={article.title}
            abstract={article.abstract || ""}
            rating={getArticleRating(article.ratings)}
            author={article.author || "unknown author"}
            imageSource={article.imageSource}
            tags={article.tags}
          />
        ))}
      </div>
    </>
  );
};

export default AllArticles;
