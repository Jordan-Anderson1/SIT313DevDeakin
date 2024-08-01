import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleData } from "../utils/firebase";

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState({});

  useEffect(() => {
    const fetchArticle = async () => {
      const data = await getArticleData();
      const foundArticle = data.find((article) => article.id === id);
      setArticle(foundArticle);
    };

    fetchArticle();
  }, [id]);
  return (
    <div className="min-w-screen min-h-screen p-6">
      <div className="flex items-center justify-center">
        <img src={article.imageSource} />
      </div>
      <h1 className="text-5xl my-4 text-center">{article.title}</h1>
      <p>This article was written by {article.author || "John Smith"}</p>

      <p className="text-xl leading-6">{article.abstract}</p>
      {article.tags.map((tag, index) => (
        <p key={index}>{tag}</p>
      ))}
    </div>
  );
};

export default ArticlePage;
