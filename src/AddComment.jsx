import React, { useState } from "react";
import { addCommentToQuestion } from "./utils/firebase";
import { Timestamp } from "firebase/firestore";

const AddComment = ({ id, username, setCommented, commented }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const date = Timestamp.fromDate(new Date());
      await addCommentToQuestion(id, {
        comment: comment,
        username: username,
        date: date,
      });
      setComment("");
      setCommented(!commented);
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div className="w-screen p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label className="text-xl" htmlFor="comment">
          Write your comment below
        </label>
        <textarea
          className="border border-gray-40 rounded-xl p-2"
          name="comment"
          id="comment"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          type="submit"
          className="bg-emerald-900 p-2 text-white rounded-xl text-xl font-semibold"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default AddComment;
