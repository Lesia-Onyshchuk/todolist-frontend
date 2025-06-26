import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import { ToastContainer } from "react-toastify";
import Loader from "./components/Loader/Loader";

import { lazy, Suspense, FC } from "react";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const BoardPage = lazy(() => import("./pages/BoardPage/BoardPage"));
const LoadBoardPage = lazy(() => import("./pages/LoadBoardPage/LoadBoardPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

const App: FC = () => {
  return (
    <div className="appBox">
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
};

export default App;
