import React from "react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useDispatch } from "react-redux";
import { Bounce, toast } from "react-toastify";
import * as Yup from "yup";
import { addTask, fetchTasks } from "../../redux/tasks/operations";
import { useParams } from "react-router-dom";
import { MdDownloadDone } from "react-icons/md";
import css from "./AddTask.module.css";
import type { AppDispatch } from "../../redux/store";

interface FormValues {
  title: string;
  description: string;
}

const AddTask: React.FC = () => {
  const initialValues: FormValues = { title: "", description: "" };
  const dispatch = useDispatch<AppDispatch>();
  const { boardId } = useParams<{ boardId: string }>();

  const TasksSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, "Too Short!")
      .max(30, "Too Long!")
      .required("Required"),
    description: Yup.string()
      .min(3, "Too Short!")
      .max(300, "Too Long!")
      .required("Required"),
  });

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    if (!boardId) {
      toast.error("Board ID is missing.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }

    try {
      await dispatch(
        addTask({
          boardId,
          title: values.title,
          description: values.description,
          status: "todo",
        })
      ).unwrap();

      toast.success("Task successfully created!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Bounce,
      });

      dispatch(fetchTasks({ boardId }));

      actions.resetForm({ values: initialValues });
    } catch (error) {
      toast.error("Failed to create task.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  return (
    <div className={css.box}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={TasksSchema}
      >
        <Form className={css.form}>
          <div className={css.inputBox}>
            <Field
              type="text"
              name="title"
              placeholder="Title"
              className={css.title}
            />
            <ErrorMessage name="title" component="span" className={css.error} />
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
          <button type="submit" className={css.addBtn}>
            <MdDownloadDone className={css.icon} />
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddTask;
