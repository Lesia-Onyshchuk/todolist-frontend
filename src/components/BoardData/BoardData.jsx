import { useDispatch } from "react-redux";
import css from "./BoardData.module.css";
import { useNavigate } from "react-router-dom";
import { deleteBoard } from "../../redux/boards/operations";
import { Bounce, toast } from "react-toastify";
import { GoTrash } from "react-icons/go";

const BoardData = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(deleteBoard(data.boardId));
    toast.success("Board successfully deleted!", {
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
      <h2 className={css.name}>{data.name}</h2>
      <h1 className={css.id}>{data.boardId}</h1>
      <button type="button" onClick={handleDelete} className={css.delBtn}>
        <GoTrash style={{ width: "36px", height: "36px", fill: "#f00" }} />
      </button>
    </div>
  );
};

export default BoardData;
