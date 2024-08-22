import React, { useState, useEffect } from "react";
import QuestionPreview from "../QuestionPreview";
import { getHiddenQuestions, getQuestionData } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import ClipLoader from "react-spinners/ClipLoader";
import { Timestamp } from "firebase/firestore";

const AllQuestionsPage = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [hiddenQuestions, setHiddenQuestions] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const [filters, setFilters] = useState({
    tag: "",
    title: "",
    date: { fromDate: "", toDate: "" },
  });

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
          setLoading(true);
          const data = await getQuestionData();
          //filter out hidden questions
          const hiddenQuestions = await getHiddenQuestions(user.uid);
          setHiddenQuestions(hiddenQuestions);
          const visibleQuestions = data.filter(
            (question) => !hiddenQuestions.includes(question.id)
          );

          setQuestions(visibleQuestions);
        }
      } catch (e) {
        console.log(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [hiddenQuestions]);

  //updates filtered questions based on applied filters.
  useEffect(() => {
    let updatedQuestions = [...questions];
    if (
      filters.tag ||
      filters.title ||
      (filters.date.fromDate && filters.date.toDate)
    ) {
      setFiltered(true);
    } else {
      setFiltered(false);
      setFilteredQuestions(questions);
      return;
    }

    if (filters.tag) {
      updatedQuestions = updatedQuestions.filter((question) =>
        question.tags.some((tag) =>
          tag.toLowerCase().includes(filters.tag.toLowerCase())
        )
      );
    }

    if (filters.title) {
      updatedQuestions = updatedQuestions.filter((question) => {
        return question.title
          .toLowerCase()
          .includes(filters.title.toLowerCase());
      });
    }

    if (filters.date.fromDate && filters.date.toDate) {
      const fromDate = new Date(filters.date.fromDate);
      const toDate = new Date(filters.date.toDate);
      updatedQuestions = updatedQuestions.filter((question) => {
        const uploadDate = question.uploadDate.toDate();
        return uploadDate >= fromDate && uploadDate <= toDate;
      });
    }

    setFilteredQuestions(updatedQuestions);
  }, [filters]);

  //updates date in filter state object
  const handleDateChange = (e) => {
    const { id, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      date: { ...prev.date, [id]: value },
    }));
  };

  return (
    <>
      <div
        className={`text-xl text-center p-4 ${
          showFilters === true ? "hidden" : null
        }`}
      >
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-emerald-900 p-2 rounded-xl text-white flex ml-auto"
        >
          Show filters
        </button>
      </div>
      <div
        className={`flex gap-12 items-center p-4 text-xl ${
          showFilters ? null : "hidden"
        }`}
      >
        <div className="space-x-2">
          <label className="text-3xl font-semibold" htmlFor="tag">
            tag:
          </label>
          <input
            type="text"
            id="tag"
            name="tag"
            className="border-2 border-gray-400 rounded-xl px-2"
            value={filters.tag}
            onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
          />
        </div>

        <div className="space-x-2">
          <label className="text-3xl font-semibold" htmlFor="title">
            Title:
          </label>
          <input
            type="text"
            id="title"
            className="border-2 border-gray-400 rounded-xl px-2"
            value={filters.title}
            onChange={(e) => setFilters({ ...filters, title: e.target.value })}
          />
        </div>

        <div className="space-x-2">
          <label className="text-3xl font-semibold" htmlFor="fromDate">
            From date:
          </label>
          <input
            className="border-2 border-gray-400 rounded-xl px-2"
            type="date"
            id="fromDate"
            value={filters.date.fromDate}
            onChange={handleDateChange}
          />
        </div>

        <div className="space-x-2">
          <label className="text-3xl font-semibold" htmlFor="toDate">
            To date:
          </label>
          <input
            className="border-2 border-gray-400 rounded-xl px-2"
            type="date"
            id="toDate"
            value={filters.date.toDate}
            onChange={handleDateChange}
          />
        </div>

        <div className="space-x-2 ml-auto">
          <button
            onClick={() =>
              setFilters({
                tag: "",
                title: "",
                date: { fromDate: "", toDate: "" },
              })
            }
            className="border border-emerald-900 p-2 rounded-xl ml-auto"
          >
            Clear All
          </button>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className=" bg-emerald-900 rounded-xl p-2 text-white"
          >
            Hide Filters
          </button>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-4 justify-center w-screen">
        {filtered
          ? filteredQuestions.map((question, index) => (
              <QuestionPreview
                onClick={() => navigate(`/question/${question.id}`)}
                key={index}
                title={question.title}
                author={question.author}
                description={question.description}
                tags={question.tags}
                uploadDate={formatDate(question.uploadDate)}
                id={question.id}
                hidden={false}
              />
            ))
          : questions.map((question, index) => (
              <QuestionPreview
                hidden={false}
                onClick={() => navigate(`/question/${question.id}`)}
                key={index}
                title={question.title}
                author={question.author}
                description={question.description}
                tags={question.tags}
                uploadDate={formatDate(question.uploadDate)}
                id={question.id}
              />
            ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => navigate("/hidden-questions")}
          className="bg-emerald-900 mb-4 p-2 rounded-xl text-white font-semibold text-xl mt-40"
        >
          Click here to see hidden questions
        </button>
      </div>
    </>
  );
};

export default AllQuestionsPage;
