import { useDroppable } from "@dnd-kit/core";
import AddTask from "../AddTask/AddTask.jsx";
import TaskItem from "../TaskItem/TaskItem.jsx";
import { useSelector } from "react-redux";
import { selectTasks } from "../../redux/tasks/selectors.js";

const ToDo = () => {
  const { setNodeRef } = useDroppable({ id: "todo" });
  const tasks = useSelector(selectTasks);

  const todoTasks = tasks.filter((task) => task.status === "todo");

  return (
    <div ref={setNodeRef}>
      <h2>ToDo</h2>
      <ul>
        {todoTasks.map((task) => (
          <TaskItem key={task._id} task={task} />
        ))}
      </ul>
      <AddTask />
    </div>
  );
};

export default ToDo;
