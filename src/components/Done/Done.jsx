import { useDroppable } from "@dnd-kit/core";
import { useSelector } from "react-redux";
import { selectTasks } from "../../redux/tasks/selectors";
import TaskItem from "../TaskItem/TaskItem.jsx";
import css from "./Done.module.css";

const Done = () => {
  const { setNodeRef } = useDroppable({ id: "done" });
  const tasks = useSelector(selectTasks);

  const doneTasks = tasks.filter((task) => task.status === "done");
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
        {doneTasks.map((task) => (
          <TaskItem key={task._id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default Done;
