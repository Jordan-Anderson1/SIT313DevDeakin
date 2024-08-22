import React from "react";
import { UserAuth } from "./context/AuthContext";
import { hideQuestion } from "./utils/firebase";

const QuestionPreview = ({
  title,
  author,
  description,
  tags,
  onClick,
  id,
  hidden,
}) => {
  const { user } = UserAuth();
  //adds question id to user profile (hidden Questions array). This is then filtered in the all questions page.
  const handleHideQuestion = async (e) => {
    e.stopPropagation();
    if (!hidden) {
      await hideQuestion(id, user.uid);
    } else {
      //unhide question
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-gradient-to-br  from-[#fbc2eb] to-[#a6c1ee]  gap-8 h-[400px] hover:cursor-pointer bg-slate-100 p-4 rounded-xl shadow-lg "
    >
      <button className="z-50" onClick={handleHideQuestion}>
        {hidden ? "Unhide this question" : "hide this question"}
      </button>
      <p className="text-2xl w-full font-bold">{title}</p>

      <p>{description}</p>
      <p className="mt-auto">Question by {author}</p>

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
  );
};

export default QuestionPreview;
