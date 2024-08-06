import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleData } from "../utils/firebase";
import RateArticle from "../RateArticle";
import ClipLoader from "react-spinners/ClipLoader";

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getArticleData();
        const foundArticle = data.find((article) => article.id === id);
        setArticle(foundArticle);
      } catch (e) {
        console.log(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);
  return (
    <>
      {loading ? (
        <div className="w-screen h-screen flex items-center justify-center">
          <ClipLoader size={150} color="green" />
        </div>
      ) : (
        <div className="min-w-screen bg-gray-50">
          <div className="flex items-center justify-center">
            <img
              src={article.imageSource}
              className="w-full h-[500px]  object-contain"
            />
          </div>
          <h1 className="text-5xl mt-4 font-semibold text-center">
            {article.title}
          </h1>
          <p className="text-center">
            This article was written by
            <span className="underline ml-1">
              {article.author || "Unknown author"}
            </span>
          </p>

          <div className="p-6 space-y-4 text-2xl">
            <p>
              <span className="font-semibold">Abstract: </span>
              {article.abstract}
            </p>

            <div className="flex gap-4">
              {article.tags &&
                article.tags.map((tag, index) => <p key={index}>#{tag}</p>)}
            </div>

            <p className="text-2xl text-gray-900 leading-8">{article.text}</p>
          </div>

          <RateArticle id={id} />
        </div>
      )}
    </>
  );
};

export default ArticlePage;
