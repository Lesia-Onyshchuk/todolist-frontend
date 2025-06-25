import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout.jsx";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import Loader from "./components/Loader/Loader.jsx";
import { selectBoardLoading } from "./redux/boards/selectors.js";
import { selectTaskLoading } from "./redux/tasks/selectors.js";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const BoardPage = lazy(() => import("./pages/BoardPage/BoardPage.jsx"));
const LoadBoardPage = lazy(() =>
  import("./pages/LoadBoardPage/LoadBoardPage.jsx")
);
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage/NotFoundPage.jsx")
);

function App() {
  const boardLoading = useSelector(selectBoardLoading);
  const taskLoading = useSelector(selectTaskLoading);
  return (
    <div className="appBox">
      {(boardLoading || taskLoading) && <Loader />}
      <ToastContainer />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/boards" element={<LoadBoardPage />} />
            <Route path="/boards/:boardId" element={<BoardPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
