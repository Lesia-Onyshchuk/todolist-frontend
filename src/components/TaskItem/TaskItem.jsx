import { useDraggable } from "@dnd-kit/core";
import { deleteTask } from "../../redux/tasks/operations";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });
  const { boardId } = useParams();

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    margin: "8px 0",
    padding: "8px",
    backgroundColor: "#f0f0f0",
    borderRadius: "4px",
    cursor: "grab",
  };

  return (
    <li ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <button type="button">Edit</button>
      <button
        type="button"
        onClick={() => {
          dispatch(deleteTask({ boardId, id: task._id }));
        }}
      >
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
