import Home from "./routes/Home";
import Login from "./routes/Login";
import { Route, Routes } from "react-router-dom";
import NewPostPage from "./routes/NewPostPage";
import Register from "./routes/Register";
import Header from "./Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post" element={<NewPostPage />} />
      </Routes>
    </>
  );
}

export default App;
