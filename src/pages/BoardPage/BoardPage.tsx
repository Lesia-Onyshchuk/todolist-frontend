import { FC } from "react";
import Board from "../../components/Board/Board";
import css from "./BoardPage.module.css";

const BoardPage: FC = () => {
  return (
    <div className={css.boardBox}>
      <Board />
    </div>
  );
};

export default BoardPage;
