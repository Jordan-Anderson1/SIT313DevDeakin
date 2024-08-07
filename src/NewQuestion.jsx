import React, { useState, useEffect } from "react";
import Tag from "./Tag";
import RenderTags from "./RenderTags";
import EnterTags from "./EnterTags";
import { v4 as uuidv4 } from "uuid";
import { UserAuth } from "./context/AuthContext";
import { addNewQuestion, getFirestoreData } from "./utils/firebase";

const Question = ({ setSubmitted }) => {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const { user } = UserAuth();

  //gets author name from Firebase
  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const data = await getFirestoreData(user.uid);
        const authorName = data.name;
        setAuthor(authorName);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchAuthorData();
  }, [user]);
  const handleClick = async () => {
    const uuid = uuidv4();

    if (title !== "" && (description !== "") & (tags.length > 0)) {
      try {
        await addNewQuestion(uuid, title, description, tags, author);
        setTagInput("");
        setTitle("");
        setDescription("");
        setTags([]);
        setSubmitted(true);
      } catch (e) {
        alert("Please complete all feilds ");
      }
    }

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
