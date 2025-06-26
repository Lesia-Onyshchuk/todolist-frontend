import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { useSelector } from "react-redux";
import { selectTasks } from "../../redux/tasks/selectors";
import TaskItem from "../TaskItem/TaskItem";
import css from "./InProgress.module.css";
import type { RootState } from "../../redux/store";
import type { Task } from "../../redux/tasks/slice";

const InProgress: React.FC = () => {
  const { setNodeRef } = useDroppable({ id: "inprogress" });
  const tasks = useSelector((state: RootState) => selectTasks(state));

  const inprogressTasks = tasks.filter(
    (task: Task) => task.status === "inprogress"
  );

  return (
    <div
      ref={setNodeRef}
      style={{
        minHeight: "460px",
        minWidth: "380px",
      }}
      className={css.box}
    >
      <h2 className={css.title}>In Progress</h2>
      <ul>
        {inprogressTasks.map((task: Task) => (
          <TaskItem key={task._id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default InProgress;
