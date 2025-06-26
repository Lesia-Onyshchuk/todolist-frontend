import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteBoard } from "../../redux/boards/operations";
import { Bounce, toast } from "react-toastify";
import { GoTrash } from "react-icons/go";
import css from "./BoardData.module.css";
import type { AppDispatch } from "../../redux/store";
import type { Board } from "../../redux/boards/slice";
import { clearTasks } from "../../redux/tasks/slice";

interface BoardWrapper {
  data: Board;
}

interface BoardDataProps {
  data: BoardWrapper;
}

const BoardData: React.FC<BoardDataProps> = ({ data }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(deleteBoard(String(data.data.boardId)));
    dispatch(clearTasks());
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

  return (
    <div className={css.boardBox}>
      <h2 className={css.name}>Board title: {data.data.name}</h2>
      <h1 className={css.id}>Board ID: {data.data.boardId}</h1>
      <button type="button" onClick={handleDelete} className={css.delBtn}>
        <GoTrash style={{ width: 36, height: 36, fill: "#f00" }} />
      </button>
    </div>
  );
};

export default BoardData;
