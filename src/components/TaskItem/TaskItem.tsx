import { useDraggable } from "@dnd-kit/core";
import { deleteTask, updateTask } from "../../redux/tasks/operations";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Bounce, toast } from "react-toastify";
import { MdOutlineCancel, MdOutlineEdit } from "react-icons/md";
import { GoTrash } from "react-icons/go";
import { IoSaveOutline } from "react-icons/io5";
import css from "./TaskItem.module.css";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { AppDispatch } from "../../redux/store";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
}

interface Params {
  [key: string]: string | undefined;
  boardId?: string;
}

interface FormValues {
  title: string;
  description: string;
}

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });
  const { boardId } = useParams<Params>();

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    if (!boardId) return;
    dispatch(
      updateTask({
        boardId,
        id: task._id,
        updates: {
          title: values.title,
          description: values.description,
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
    actions.setSubmitting(false);
  };

  return (
    <li ref={setNodeRef} className={css.box} style={style}>
      <div {...(!isEditing ? { ...listeners, ...attributes } : {})}>
        {isEditing ? (
          <Formik
            initialValues={{ title: task.title, description: task.description }}
            enableReinitialize={true}
            onSubmit={handleSave}
          >
            <Form>
              <div className={css.inputBox}>
                <Field
                  type="text"
                  name="title"
                  placeholder="Title"
                  className={css.title}
                />
                <ErrorMessage
                  name="title"
                  component="span"
                  className={css.error}
                />
              </div>
              <div className={css.inputBox}>
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Description"
                  className={css.text}
                />
                <ErrorMessage
                  name="description"
                  component="span"
                  className={css.error}
                />
              </div>
              <div className={css.btnBox}>
                <button type="submit" className={css.saveEditBtn}>
                  <IoSaveOutline className={css.saveEditIcon} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className={css.cancelDelBtn}
                >
                  <MdOutlineCancel />
                </button>
              </div>
            </Form>
          </Formik>
        ) : (
          <div className={css.taskBox}>
            <h3 className={css.head}>{task.title}</h3>
            <p className={css.descr}>{task.description}</p>
          </div>
        )}
      </div>

      {!isEditing && (
        <div className={css.btnBox}>
          <button
            onClick={() => setIsEditing(true)}
            className={css.saveEditBtn}
          >
            <MdOutlineEdit className={css.saveEditIcon} />
          </button>
          <button
            onClick={() => {
              if (!boardId) return;
              dispatch(deleteTask({ boardId, id: task._id }));
            }}
            className={css.cancelDelBtn}
          >
            <GoTrash className={css.cancelDelIcon} />
          </button>
        </div>
      )}
    </li>
  );
};

export default TaskItem;
