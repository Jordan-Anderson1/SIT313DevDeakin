import React from "react";

const QuestionPreview = ({ title, author, description, tags, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="max-w-[450px] flex flex-col gap-4 h-[400px] hover:cursor-pointer bg-slate-100 p-4 rounded-xl shadow-lg"
    >
      <p className="text-2xl font-bold">{title}</p>

      <p>{description}</p>
      <p className="mt-auto">Question by {author}</p>
      <div className="">
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
    </div>
  );
};

export default QuestionPreview;
