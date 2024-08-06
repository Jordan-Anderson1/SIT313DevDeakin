import React, { useState, useEffect } from "react";
import ArticlePreview from "./ArticlePreview.jsx";
import { useNavigate, Link } from "react-router-dom";
import { getArticleData, getArticleImage } from "./utils/firebase";
import ClipLoader from "react-spinners/ClipLoader";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

//Featured articles displays the three articles with the highest rating

const FeaturedArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

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

        setArticles(sortedArticles.slice(0, 4));
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
        <div className="my-8 w-full flex flex-col justify-center items-center p-2">
          <h1 className="text-center text-5xl my-4 font-bold">
            Featured Articles
          </h1>

          {/* //displays until medium screens as a carousel */}
          <div className="flex items-center gap-2 md:hidden">
            <FaArrowLeft
              size="30"
              color="gray"
              onClick={() => {
                if (index === 0) {
                  setIndex(articles.length - 1);
                } else {
                  setIndex((prev) => prev - 1);
                }
              }}
            />
            {
              <ArticlePreview
                title={articles[index].title}
                imageSource={articles[index].imageSource}
                abstract={articles[index].abstract}
                rating={getArticleRating(articles[index].ratings)}
                author={articles[index].author}
                tags={articles[index].tags}
              />
            }

            <FaArrowRight
              size="30"
              color="gray"
              onClick={() => {
                if (index === 3) {
                  setIndex(0);
                } else {
                  setIndex((prev) => prev + 1);
                }
              }}
            />
          </div>

          {/* displays as a grid on medium and above screens */}
          <div className=" md:justify-between md:mx-12 hidden md:grid md:grid-cols-2  xl:grid-cols-4 gap-8 p-4  justify-center">
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
