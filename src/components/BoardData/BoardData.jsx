import { useDispatch } from "react-redux";
import css from "./BoardData.module.css";
import { useNavigate } from "react-router-dom";
import { deleteBoard } from "../../redux/boards/operations";
import { Bounce, toast } from "react-toastify";

const BoardData = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(deleteBoard(data.boardId));
    toast.success("Task successfully deleted!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
    navigate("/");
  };

  console.log("BoardData", data);
  return (
    <div className={css.boardBox}>
      <div className={css.boardData}>
        <h1>{data.boardId}</h1>
        <p>{data.name}</p>
      </div>
      <button type="button" onClick={handleDelete}>
        delete
      </button>
    </div>
  );
};

export default BoardData;
