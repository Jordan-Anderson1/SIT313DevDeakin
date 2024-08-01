import React, { useState, useEffect } from "react";
import { getArticleData, getArticleImage } from "../utils/firebase";
import ArticlePreview from "../ArticlePreview";
import { useNavigate } from "react-router-dom";

const AllArticles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticleData();
        setArticles(data);
      } catch (e) {
        console.log(e.message);
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
      <div className="grid grid-cols-4 gap-4 p-4">
        {articles.map((article, index) => (
          <ArticlePreview
            onClick={() => navigate(`/article/${article.id}`)}
            key={index}
            title={article.title}
            abstract={article.abstract || ""}
            rating={article.rating}
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
