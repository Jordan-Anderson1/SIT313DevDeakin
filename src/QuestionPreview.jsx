import React from "react";
import { UserAuth } from "./context/AuthContext";
import { hideQuestion, unhideQuestion } from "./utils/firebase";

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
      className="flex flex-col h-[400px] hover:cursor-pointer bg-slate-100 p-4 rounded-xl shadow-lg relative"
    >
      <p className="text-2xl w-full font-bold">{title}</p>

      <p className="text-lg mt-4">{description}</p>
      <p className="mt-auto text-lg font-semibold">Question by {author}</p>
      <p>{uploadDate}</p>

      <div className="flex flex-wrap">
        {tags &&
          tags.map((tag, index) => {
            return (
              <p
                className="bg-emerald-900 h-fit text-white p-2 inline-block m-[4px] rounded-md"
                key={index}
              >
                #{tag}
              </p>
            );
          })}
      </div>

      <button
        className="z-50 m-2 border border-emerald-900 p-2 font-semibold rounded-xl"
        onClick={handleHideQuestion}
      >
        {hidden ? "Unhide this question" : "hide this question"}
      </button>
    </div>
  );
};

export default QuestionPreview;
