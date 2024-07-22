import Home from "./routes/Home";
import Login from "./routes/Login";
import { Route, Routes } from "react-router-dom";
import NewPostPage from "./routes/NewPostPage";
import Register from "./routes/Register";
import Header from "./Header";
import ProtectedRoute from "./ProtectedRoute";
import { AuthContextProvider } from "./context/AuthContext";

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
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
