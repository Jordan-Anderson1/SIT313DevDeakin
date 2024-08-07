import React, { useEffect } from "react";

const DisplayComments = ({ comments, commented, id }) => {
  useEffect(() => {}, [commented]);
  return (
    <div className="bg-gray-50 p-6 space-y-4 overflow-wrap">
      <h1 className="text-xl md:text-4xl text-center font-bold">Comments</h1>

      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <div key={index} className="flex gap-4 animate-fadeIn">
            <p className="whitespace-nowrap mr-4 md:mr-8">{comment.username}</p>
            <p className="border-l-2 border-gray-300 pl-2 break-words break-all whitespace-normal">
              {comment.comment}
            </p>
          </div>
        ))
      ) : (
        <h1>Be the first to leave a comment...</h1>
      )}
    </div>
  );
};

export default DisplayComments;
