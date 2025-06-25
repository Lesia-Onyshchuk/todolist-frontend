import Board from "../../components/Board/Board.jsx";
import css from "./BoardPage.module.css";

const BoardPage = () => {
  return (
    <div className={css.boardBox}>
      <Board />
    </div>
  );
};

export default BoardPage;
