import { useDroppable } from "@dnd-kit/core";
import { useSelector } from "react-redux";
import { selectTasks } from "../../redux/tasks/selectors";
import TaskItem from "../TaskItem/TaskItem.jsx";

const InProgress = () => {
  const { setNodeRef } = useDroppable({ id: "inprogress" });
  const tasks = useSelector(selectTasks);

  const inprogressTasks = tasks.filter((task) => task.status === "inprogress");
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
      <h2>InProgress</h2>
      <ul>
        {inprogressTasks.map((task) => (
          <TaskItem key={task._id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default InProgress;
