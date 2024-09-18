import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useParams } from "react-router-dom";
import { getQuestionData } from "../utils/firebase";
import AddComment from "../AddComment";
import DisplayComments from "../DisplayComments";
import { UserAuth } from "../context/AuthContext";
import { getFirestoreData } from "../utils/firebase";
import Markdown from "react-markdown";

const QuestionPage = () => {
  const { id } = useParams();
  const [question, setquestion] = useState({});
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [commented, setCommented] = useState(false);
  const { user } = UserAuth();

  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        setLoading(true);
        const data = await getQuestionData();
        const foundQuestion = data.find((question) => question.id === id);
        setquestion(foundQuestion);
      } catch (e) {
        console.log(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionData();
  }, [id]);

  //automatically re-render when new comments are posted
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getQuestionData();
        const foundQuestion = data.find((question) => question.id === id);
        setquestion(foundQuestion);
      } catch (e) {
        console.log(e.message);
      }
    };

    fetchComments();
  }, [commented]);

  //gets user name from Firebase
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getFirestoreData(user.uid);
        const username = data.name;
        setUsername(username);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchUserData();
  }, [user]);

  return (
    <div>
      {loading ? (
        <div className="flex h-screen w-screen items-center justify-center">
          <ClipLoader size={150} color="green" />
        </div>
      ) : (
        <>
          <div className="p-4">
            <h1 className="text-center text-2xl font-bold md:text-4xl">
              {question.title}
            </h1>
            <p className="text-center">
              This question was asked by{" "}
              <span className="underline">{question.author}</span>
            </p>
            <Markdown className="my-6 text-lg leading-6 text-gray-900 md:text-2xl">
              {question.description}
            </Markdown>
            <div className="flex gap-4">
              {question.tags.map((tag, index) => {
                return <p key={index}>#{tag}</p>;
              })}
            </div>
          </div>
          <AddComment
            id={id}
            username={username}
            setCommented={setCommented}
            commented={commented}
          />
          <DisplayComments comments={question.comments} id={id} />
        </>
      )}
    </div>
  );
};

export default QuestionPage;
