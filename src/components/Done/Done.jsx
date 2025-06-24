import { useDroppable } from "@dnd-kit/core";
import { useSelector } from "react-redux";
import { selectTasks } from "../../redux/tasks/selectors";
import TaskItem from "../TaskItem/TaskItem.jsx";

const Done = () => {
  const { setNodeRef } = useDroppable({ id: "done" });
  const tasks = useSelector(selectTasks);

  const doneTasks = tasks.filter((task) => task.status === "done");
  return (
    <div
      ref={setNodeRef}
      style={{
        border: "2px dashed lightgray",
        minHeight: "200px",
        minWidth: "250px",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <h2>Done</h2>
      <ul>
        {doneTasks.map((task) => (
          <TaskItem key={task._id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default Done;
