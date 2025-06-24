import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import BoardPage from "./pages/BoardPage/BoardPage.jsx";
import LoadBoardPage from "./pages/LoadBoardPage/LoadBoardPage.jsx";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="appBox">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/boards" element={<LoadBoardPage />} />
          <Route path="/boards/:boardId" element={<BoardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
