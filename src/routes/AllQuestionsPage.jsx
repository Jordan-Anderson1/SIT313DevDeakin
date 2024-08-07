import React, { useState, useEffect } from "react";
import QuestionPreview from "../QuestionPreview";
import { getQuestionData } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

const AllQuestionsPage = () => {
  //dummy data temporary for building out section

  const [questions, setQuestions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getQuestionData();
        setQuestions(data);
      } catch (e) {
        console.log(e.message);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-4 justify-center">
      {questions.map((question, index) => (
        <QuestionPreview
          onClick={() => navigate(`/question/${question.id}`)}
          key={index}
          title={question.title}
          author={question.author}
          description={question.description}
          tags={question.tags}
        />
      ))}
    </div>
  );
};

export default AllQuestionsPage;
