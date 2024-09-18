import React from "react";
import { UserAuth } from "./context/AuthContext";
import { hideQuestion, unhideQuestion } from "./utils/firebase";
import Markdown from "react-markdown";

const QuestionPreview = ({
  title,
  author,
  description,
  tags,
  onClick,
  id,
  hidden,
  uploadDate,
}) => {
  const { user } = UserAuth();

  //adds question id to user profile (hidden Questions array). This is then filtered in the all questions page.
  const handleHideQuestion = async (e) => {
    e.stopPropagation();
    if (!hidden) {
      await hideQuestion(id, user.uid);
    } else {
      await unhideQuestion(id, user.uid);
    }
  };

  return (
    <div
      onClick={onClick}
      className="relative flex h-[400px] flex-col rounded-xl bg-slate-100 p-4 shadow-lg hover:cursor-pointer"
    >
      <p className="w-full text-2xl font-bold">{title}</p>

      <Markdown className="mt-4 text-lg">
        {description.length > 20 ? description.slice(0, 100) : description}
      </Markdown>
      <p className="mt-auto text-lg font-semibold">Question by {author}</p>
      <p>{uploadDate}</p>

      <div className="flex flex-wrap">
        {tags &&
          tags.map((tag, index) => {
            return (
              <p
                className="m-[4px] inline-block h-fit rounded-md bg-emerald-900 p-2 text-white"
                key={index}
              >
                #{tag}
              </p>
            );
          })}
      </div>

      <button
        className="z-50 m-2 rounded-xl border border-emerald-900 p-2 font-semibold"
        onClick={handleHideQuestion}
      >
        {hidden ? "Unhide this question" : "hide this question"}
      </button>
    </div>
  );
};

export default QuestionPreview;
