import { useDroppable } from "@dnd-kit/core";
import { useSelector } from "react-redux";
import { selectTasks } from "../../redux/tasks/selectors";
import TaskItem from "../TaskItem/TaskItem.jsx";
import css from "./InProgress.module.css";

const InProgress = () => {
  const { setNodeRef } = useDroppable({ id: "inprogress" });
  const tasks = useSelector(selectTasks);

  const inprogressTasks = tasks.filter((task) => task.status === "inprogress");
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
        {inprogressTasks.map((task) => (
          <TaskItem key={task._id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default InProgress;
