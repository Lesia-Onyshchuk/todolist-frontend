import { useDroppable } from "@dnd-kit/core";
import AddTask from "../AddTask/AddTask";
import TaskItem from "../TaskItem/TaskItem";
import { useSelector } from "react-redux";
import { selectTasks } from "../../redux/tasks/selectors";
import css from "./ToDo.module.css";
import { Task } from "../../redux/tasks/slice";

const ToDo: React.FC = () => {
  const { setNodeRef } = useDroppable({ id: "todo" });
  const tasks = useSelector(selectTasks);

  const todoTasks = tasks.filter((task) => task.status === "todo");

  return (
    <div
      ref={setNodeRef}
      className={css.box}
      style={{
        minHeight: "460px",
        minWidth: "380px",
      }}
    >
      <h2 className={css.title}>To Do</h2>
      <ul>
        {todoTasks.map((task: Task) => (
          <TaskItem
            key={task._id}
            task={{
              ...task,
              description: task.description ?? "",
            }}
          />
        ))}
      </ul>
      <AddTask />
    </div>
  );
};

export default ToDo;
