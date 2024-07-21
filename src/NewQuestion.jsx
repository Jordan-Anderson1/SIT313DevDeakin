import React, { useState } from "react";
import Tag from "./Tag";
import RenderTags from "./RenderTags";
import EnterTags from "./EnterTags";

const Question = ({ setSubmitted }) => {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleClick = () => {
    console.log({ tags }, { title }, { description });

    setTagInput("");
    setTitle("");
    setDescription("");
    setTags([]);
    setSubmitted(true);
  };
  return (
    <>
      <div className="space-y-2 ">
        <div className="flex gap-2 items-center">
          <label className="text-xl" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            className="w-full p-2 border-2 border-emerald-900 rounded-xl"
            type="text"
            placeholder="Start your question with how, what, why, etc..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className="text-xl" htmlFor="problem">
            Describe your problem
          </label>
          <br />
          <textarea
            className="w-full border-2 border-emerald-900 rounded-xl p-2"
            name="problem"
            id="problem"
            rows="10"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <EnterTags
          tags={tags}
          setTags={setTags}
          tagInput={tagInput}
          setTagInput={setTagInput}
        />

        <RenderTags tags={tags} setTags={setTags} />

        <button
          onClick={handleClick}
          className="bg-emerald-900 rounded-xl p-2 w-full text-white font-semibold mt-24"
        >
          Post
        </button>
      </div>
    </>
  );
};

export default Question;
