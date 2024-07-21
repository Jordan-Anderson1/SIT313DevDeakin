import React, { useState } from "react";

const EnterTags = ({ tags, setTags, tagInput, setTagInput }) => {
  return (
    <>
      <div className="flex gap-2 items-center">
        <label htmlFor="tags">Tags</label>
        <input
          className="w-full p-2 border-2 border-emerald-900 rounded-xl"
          type="text"
          id="tags"
          placeholder="Enter a tag and press enter. You can enter up to five tags."
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && tagInput.trim()) {
              e.preventDefault();
              if (!tags.includes(tagInput.trim()) && tags.length < 5) {
                setTags([...tags, tagInput.trim()]);
                setTagInput("");
              }
            }
          }}
        />
      </div>
    </>
  );
};

export default EnterTags;
