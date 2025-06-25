import { useDraggable } from "@dnd-kit/core";
import { deleteTask, updateTask } from "../../redux/tasks/operations";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Bounce, toast } from "react-toastify";
import { MdOutlineCancel, MdOutlineEdit } from "react-icons/md";
import { GoTrash } from "react-icons/go";
import { IoSaveOutline } from "react-icons/io5";

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

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleSave = () => {
    dispatch(
      updateTask({
        boardId,
        id: task._id,
        updates: {
          title: editedTitle,
          description: editedDescription,
        },
      })
    );
    toast.success("Task successfully updated!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteTask({ boardId, id: task._id }));
    toast.success("Task successfully deleted!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  return (
    <li ref={setNodeRef} style={style}>
      <div {...(!isEditing ? { ...listeners, ...attributes } : {})}>
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
          </>
        ) : (
          <>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </>
        )}
      </div>

      {isEditing ? (
        <>
          <button onClick={handleSave}>
            <IoSaveOutline />
          </button>
          <button onClick={() => setIsEditing(false)}>
            <MdOutlineCancel />
          </button>
        </>
      ) : (
        <>
          <button onClick={() => setIsEditing(true)}>
            <MdOutlineEdit />
          </button>
          <button onClick={handleDelete}>
            <GoTrash />
          </button>
        </>
      )}
    </li>
  );
};

export default TaskItem;
