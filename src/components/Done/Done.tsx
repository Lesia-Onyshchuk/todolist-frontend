import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { useSelector } from "react-redux";
import { selectTasks } from "../../redux/tasks/selectors";
import TaskItem from "../TaskItem/TaskItem";
import css from "./Done.module.css";
import type { RootState } from "../../redux/store";
import type { Task } from "../../redux/tasks/slice";

const Done: React.FC = () => {
  const { setNodeRef } = useDroppable({ id: "done" });
  const tasks = useSelector((state: RootState) => selectTasks(state));

  const doneTasks = tasks.filter((task: Task) => task.status === "done");

  return (
    <div
      ref={setNodeRef}
      style={{
        minHeight: "460px",
        minWidth: "380px",
      }}
      className={css.box}
    >
      <h2 className={css.title}>Done</h2>
      <ul>
        {doneTasks.map((task: Task) => (
          <TaskItem key={task._id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default Done;
