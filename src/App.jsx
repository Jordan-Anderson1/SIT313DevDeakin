import Home from "./routes/Home";
import Login from "./routes/Login";
import { Route, Routes } from "react-router-dom";
import NewPostPage from "./routes/NewPostPage";
import Register from "./routes/Register";
import Header from "./Header";
import ProtectedRoute from "./ProtectedRoute";
import { AuthContextProvider } from "./context/AuthContext";
import AllArticles from "./routes/AllArticles";
import ArticlePage from "./routes/ArticlePage";
import AllQuestionsPage from "./routes/AllQuestionsPage";
import LoginAlert from "./routes/LoginAlert";
import QuestionPage from "./routes/QuestionPage";
import HiddenQuestionsPage from "./routes/HiddenQuestionsPage";
import PlansPage from "./routes/PlansPage";
import ForgotPassword from "./routes/ForgotPassword";

import Success from "./routes/Success";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/post"
            element={
              <ProtectedRoute>
                <NewPostPage />
              </ProtectedRoute>
            }
          />
          <Route path="/all-articles" element={<AllArticles />} />
          <Route path="/article/:id" element={<ArticlePage />}></Route>
          <Route
            path="/questions"
            element={
              <ProtectedRoute>
                <AllQuestionsPage />
              </ProtectedRoute>
            }
          />
          <Route path="/loginAlert" element={<LoginAlert />} />
          <Route path="/question/:id" element={<QuestionPage />} />
          <Route path="/hidden-questions" element={<HiddenQuestionsPage />} />
          <Route path="/plans" element={<PlansPage />} />

          <Route path="/success" element={<Success />} />
          <Route path="/reset-password" element={<ForgotPassword />} />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
