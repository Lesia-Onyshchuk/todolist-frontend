import { selectCurrentBoard } from "../../redux/boards/selectors.js";
import BoardData from "../BoardData/BoardData.jsx";
import Done from "../Done/Done.jsx";
import InProgress from "../InProgress/InProgress.jsx";
import ToDo from "../ToDo/ToDo.jsx";
import { useDispatch, useSelector } from "react-redux";
import css from "./Board.module.css";
import { useEffect } from "react";
import { fetchTasks, updateTask } from "../../redux/tasks/operations.js";
import { selectTasks } from "../../redux/tasks/selectors.js";
import { useParams } from "react-router-dom";
import { DndContext } from "@dnd-kit/core";

const Board = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const { boardId } = useParams();
  const board = useSelector(selectCurrentBoard);

  useEffect(() => {
    dispatch(fetchTasks({ boardId }));
  }, [dispatch, boardId]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const task = tasks.find((task) => task._id === active.id);
    if (task && task.status !== over.id) {
      console.log("Update task status:", task._id, "to", over.id);
      dispatch(
        updateTask({ boardId, id: task._id, updates: { status: over.id } })
      );
    }
  };

  const handleDragStart = (event) => {
    console.log("Drag started:", event.active.id);
  };

  const handleDragOver = (event) => {
    console.log("Drag over:", event.over?.id);
  };
  console.log("ALL TASKS:", tasks);
  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className={css.boardBox}>
        <BoardData data={board.data} />
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
