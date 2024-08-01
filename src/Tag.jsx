import React from "react";
import { RxCross2 } from "react-icons/rx";

const Tag = ({ tag, setTags, tags }) => {
  return (
    <div className="bg-emerald-900 p-2 text-white flex items-center gap-6 rounded-md">
      <p>#{tag}</p>
      <RxCross2
        onClick={() => setTags(tags.filter((element) => element !== tag))}
      />
    </div>
  );
};

export default Tag;
