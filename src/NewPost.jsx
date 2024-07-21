import React, { useState } from "react";
import Question from "./NewQuestion";
import Article from "./NewArticle";

const NewPost = ({ setSubmitted }) => {
  const [postType, setPostType] = useState("");
  return (
    <div className="w-[800px] min-h-[650px] bg-white rounded-2xl p-6 space-y-2 ">
      <h1 className="text-5xl text-emerald-900 ">New Post</h1>
      <div className="space-x-12 flex text-xl">
        <h1>Select Post Type: </h1>
        <div className="space-x-2">
          <input
            type="radio"
            id="question"
            name="postType"
            value="question"
            checked={postType === "question"}
            onChange={(e) => setPostType(e.target.value)}
          />
          <label htmlFor="question">Question</label>
        </div>
        <div className="space-x-2">
          <input
            type="radio"
            id="article"
            name="postType"
            value="article"
            checked={postType === "article"}
            onChange={(e) => setPostType(e.target.value)}
          />
          <label htmlFor="article">Article</label>
        </div>
      </div>
      <h1>What would you like to post or share?</h1>
      {postType === "question" && <Question setSubmitted={setSubmitted} />}
      {postType === "article" && <Article setSubmitted={setSubmitted} />}
    </div>
  );
};

export default NewPost;
