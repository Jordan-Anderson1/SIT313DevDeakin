import React, { useState, useEffect } from "react";
import { getArticleData } from "../utils/firebase";
import Article from "../Article";

const AllArticles = () => {
  const [articles, setArticles] = useState([{}]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticleData();
        setArticles(data);
        console.log(data);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div>
      {articles.map((article, index) => (
        <Article />
      ))}
      ;
    </div>
  );
};

export default AllArticles;
