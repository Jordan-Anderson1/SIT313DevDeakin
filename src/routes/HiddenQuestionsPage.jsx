import React, { useState, useEffect } from "react";
import { getHiddenQuestions, getQuestionData } from "../utils/firebase";
import QuestionPreview from "../QuestionPreview";
import { UserAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Timestamp } from "firebase/firestore";

const HiddenQuestionsPage = () => {
  const [hiddenQuestions, setHiddenQuestions] = useState([]);
  const { user } = UserAuth();
  const navigate = useNavigate();

  const formatDate = (timestamp) => {
    if (timestamp instanceof Timestamp)
      return timestamp.toDate().toLocaleString();
  };

  //get array of questions from Firebase
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        if (user) {
          const data = await getQuestionData();
          //filter out hidden questions
          const hiddenQuestions = await getHiddenQuestions(user.uid);
          const visibleQuestions = data.filter((question) =>
            hiddenQuestions.includes(question.id),
          );

          setHiddenQuestions(visibleQuestions);
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchQuestions();
  }, [hiddenQuestions]);
  return (
    <>
      <h1 className="my-4 text-center text-2xl font-bold">Hidden Questions</h1>
      <div className="grid w-screen justify-center gap-8 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {hiddenQuestions.length > 0 ? (
          hiddenQuestions.map((question, index) => (
            <QuestionPreview
              onClick={() => navigate(`/question/${question.id}`)}
              key={index}
              title={question.title}
              author={question.author}
              description={question.description}
              tags={question.tags}
              uploadDate={formatDate(question.uploadDate)}
              id={question.id}
              hidden={true}
            />
          ))
        ) : (
          <div className="align-center flex w-screen flex-col justify-center">
            <p className="text-center text-4xl font-bold">
              No hidden questions
            </p>
            <Link to="/questions" className="mt-4 text-center underline">
              Click here to see all questions
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default HiddenQuestionsPage;
