import React from "react";
import Header from "../Header";
import HeadingImage from "../HeadingImage";
import FeaturedArticles from "../FeaturedArticles";
import FeaturedTutorials from "../FeaturedTutorials";
import SignUp from "../SignUp";
import Footer from "../Footer";

const Home = () => {
  return (
    <>
      <div className="w-screen overflow-hidden">
        <HeadingImage />
        <FeaturedArticles />
        <FeaturedTutorials />
        <SignUp />
        <Footer />
      </div>
    </>
  );
};

export default Home;
