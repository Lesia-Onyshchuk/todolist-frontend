import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

import { selectCurrentBoard } from "../../redux/boards/selectors";
import { selectTasks } from "../../redux/tasks/selectors";
import { fetchBoardById } from "../../redux/boards/operations";
import { fetchTasks, updateTask } from "../../redux/tasks/operations";

import BoardData from "../BoardData/BoardData";
import Done from "../Done/Done";
import InProgress from "../InProgress/InProgress";
import ToDo from "../ToDo/ToDo";
import Loader from "../Loader/Loader";

import css from "./Board.module.css";
import type { AppDispatch, RootState } from "../../redux/store";
import type { Task } from "../../redux/tasks/slice";
import type { Board } from "../../redux/boards/slice";

const Board: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => selectTasks(state));
  const board = useSelector((state: RootState) => selectCurrentBoard(state));
  console.log("BOARD", board);
  const { boardId } = useParams<{ boardId: string }>();

  useEffect(() => {
    if (boardId) {
      dispatch(fetchBoardById(boardId));
      dispatch(fetchTasks({ boardId }));
    }
  }, [dispatch, boardId]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const task = tasks.find((task: Task) => task._id === active.id);
    if (task && task.status !== String(over.id) && boardId) {
      dispatch(
        updateTask({
          boardId,
          id: task._id,
          updates: { status: String(over.id) },
        })
      );
    }
  };

  if (!board) {
    return <Loader />;
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className={css.boardBox}>
        <BoardData data={board as Board} />
        <ul className={css.todoList}>
          <li className={css.todo}>
            <ToDo />
          </li>
          <li className={css.inprogress}>
            <InProgress />
          </li>
          <li className={css.done}>
            <Done />
          </li>
        </ul>
      </div>
    </DndContext>
  );
};

export default Board;
