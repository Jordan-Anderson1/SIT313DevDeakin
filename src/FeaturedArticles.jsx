import React, { useState, useEffect } from "react";
import ArticlePreview from "./ArticlePreview.jsx";
import { useNavigate, Link } from "react-router-dom";
import { getArticleData, getArticleImage } from "./utils/firebase";
import ClipLoader from "react-spinners/ClipLoader";

//Featured articles displays the three articles with the highest rating

const FeaturedArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getArticleRating = (ratings) => {
    const total = ratings.reduce((acc, current) => {
      return acc + current;
    }, 0);

    return Math.ceil(total / ratings.length);
  };

  const averageRating = (ratings) => {
    if (ratings.length === 0) {
      return 0;
    }
    return (
      ratings.reduce((acc, curr) => {
        return acc + curr;
      }, 0) / ratings.length
    );
  };
  useEffect(() => {
    const fetchAndSortArticles = async () => {
      try {
        const data = await getArticleData();

        //sort articles by rating
        const sortedArticles = data.sort(
          (a, b) => averageRating(b.ratings) - averageRating(a.ratings)
        );

        setArticles(sortedArticles.slice(0, 3));
        console.log(articles);
      } catch (e) {
        console.log(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSortArticles();
  }, []);

  return (
    <>
      {loading ? (
        <div className="w-screen h-screen flex items-center justify-center">
          <ClipLoader size={150} color="green" />
        </div>
      ) : (
        <div className="my-8 w-full ">
          <h1 className="text-center text-5xl my-4 font-bold">
            Featured Articles
          </h1>
          <div className="md:flex md:justify-between md:mx-12 grid justify-center">
            {articles.map((article, index) => (
              <ArticlePreview
                onClick={() => navigate(`/article/${article.id}`)}
                key={index}
                title={article.title}
                imageSource={article.imageSource}
                abstract={article.abstract}
                rating={getArticleRating(article.ratings)}
                author={article.author}
                tags={article.tags}
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
      )}
    </>
  );
};

export default FeaturedArticles;
