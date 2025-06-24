import { useDispatch } from "react-redux";
import css from "./BoardData.module.css";
import { useNavigate } from "react-router-dom";
import { deleteBoard } from "../../redux/boards/operations";

const BoardData = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("BoardData", data);
  return (
    <div className={css.boardBox}>
      <div className={css.boardData}>
        <h1>{data.boardId}</h1>
        <p>{data.name}</p>
      </div>
      <button
        type="button"
        onClick={() => {
          dispatch(deleteBoard(data.boardId));
          navigate("/");
        }}
      >
        delete
      </button>
    </div>
  );
};

export default BoardData;
