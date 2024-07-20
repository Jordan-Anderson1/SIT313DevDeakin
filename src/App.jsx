import { useState } from "react";
import Header from "./Header";
import HeadingImage from "./HeadingImage";
import FeaturedArticles from "./FeaturedArticles";
import FeaturedTutorials from "./FeaturedTutorials";
import SignUp from "./SignUp";
import Footer from "./Footer";

function App() {
  return (
    <>
      <Header />
      <HeadingImage />
      <FeaturedArticles />
      <FeaturedTutorials />
      <SignUp />
      <Footer />
    </>
  );
}

export default App;
