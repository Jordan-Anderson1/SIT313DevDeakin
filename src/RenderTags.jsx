import React from "react";
import Tag from "./Tag";

const RenderTags = ({ tags, setTags }) => {
  return (
    <div className="flex gap-2 mt-4">
      {tags.map((tag, index) => (
        <Tag tag={tag} setTags={setTags} tags={tags} key={tag} />
      ))}
    </div>
  );
};

export default RenderTags;
