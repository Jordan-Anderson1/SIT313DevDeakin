import React, { useState } from "react";
import NewPost from "../NewPost";
import PostConfirmation from "../PostConfirmation";

const NewPostPage = () => {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="bg-emerald-900 min-w-screen min-h-screen flex items-center justify-center">
      {!submitted && <NewPost setSubmitted={setSubmitted} />}
      {submitted && <PostConfirmation />}
    </div>
  );
};

export default NewPostPage;
