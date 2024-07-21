import React, { useState } from "react";
import RenderTags from "./RenderTags";
import EnterTags from "./EnterTags";

const NewArticle = ({ setSubmitted }) => {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [text, setText] = useState("");

  const handleClick = () => {
    console.log({ tags }, { title }, { abstract }, { text });

    setTagInput("");
    setTitle("");
    setAbstract("");
    setText("");
    setTags([]);
    setSubmitted(true);
  };
  return (
    <div className="space-y-2">
      <div className="flex gap-2 items-center">
        <label className="text-xl" htmlFor="title">
          Title
        </label>
        <input
          className="w-full p-2 border-2 border-emerald-900 rounded-xl"
          type="text"
          id="title"
          placeholder="Enter a descriptive Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label className="text-xl" htmlFor="abstract">
          Abstract
        </label>

        <textarea
          className="w-full border-2 border-emerald-900 rounded-xl p-2"
          name="abstract"
          id="abstract"
          rows="3"
          placeholder="Enter a 1-paragraph abstract"
          value={abstract}
          onChange={(e) => setAbstract(e.target.value)}
        />
      </div>
      <div>
        <label className="text-xl" htmlFor="abstract">
          Article Text
        </label>

        <textarea
          className="w-full border-2 border-emerald-900 rounded-xl p-2"
          name="abstract"
          id="abstract"
          rows="8"
          placeholder="Enter a 1-paragraph abstract"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
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
  );
};

export default NewArticle;
