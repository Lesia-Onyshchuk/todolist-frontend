import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import Loader from "./components/Loader/Loader";
import { selectBoardLoading } from "./redux/boards/selectors";
import { selectTaskLoading } from "./redux/tasks/selectors";
import { lazy, Suspense, FC } from "react";
import { RootState } from "./redux/store";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const BoardPage = lazy(() => import("./pages/BoardPage/BoardPage"));
const LoadBoardPage = lazy(() => import("./pages/LoadBoardPage/LoadBoardPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

const App: FC = () => {
  const boardLoading = useSelector((state: RootState) =>
    selectBoardLoading(state)
  );
  const taskLoading = useSelector((state: RootState) =>
    selectTaskLoading(state)
  );

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
};

export default App;
