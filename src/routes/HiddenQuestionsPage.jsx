import React, { useState, useEffect } from "react";
import { getHiddenQuestions, getQuestionData } from "../utils/firebase";
import QuestionPreview from "../QuestionPreview";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const HiddenQuestionsPage = () => {
  const [hiddenQuestions, setHiddenQuestions] = useState([]);
  const { user } = UserAuth();
  const navigate = useNavigate();

  //get array of questions from Firebase
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        if (user) {
          const data = await getQuestionData();
          //filter out hidden questions
          const hiddenQuestions = await getHiddenQuestions(user.uid);
          const visibleQuestions = data.filter((question) =>
            hiddenQuestions.includes(question.id)
          );

          setHiddenQuestions(visibleQuestions);
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchQuestions();
  }, []);
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-4 justify-center w-screen">
      {hiddenQuestions.map((question, index) => (
        <QuestionPreview
          onClick={() => navigate(`/question/${question.id}`)}
          key={index}
          title={question.title}
          author={question.author}
          description={question.description}
          tags={question.tags}
          uploadDate={String(question.uploadDate)}
          id={question.id}
          hidden={true}
        />
      ))}
    </div>
  );
};

export default HiddenQuestionsPage;
