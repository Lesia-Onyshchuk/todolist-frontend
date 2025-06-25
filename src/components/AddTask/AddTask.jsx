import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { Bounce, toast } from "react-toastify";
import * as Yup from "yup";
import { addTask, fetchTasks } from "../../redux/tasks/operations";
import { useParams } from "react-router-dom";
import { MdDownloadDone } from "react-icons/md";
import css from "./AddTask.module.css";

const AddTask = () => {
  const initialValues = { title: "", description: "" };
  const dispatch = useDispatch();
  const { boardId } = useParams();

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

  const handleSubmit = async (values, actions) => {
    await dispatch(
      addTask({ boardId, title: values.title, description: values.description })
    ).unwrap();
    toast.success("Task successfully created!", {
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
    dispatch(fetchTasks({ boardId }));
    actions.resetForm({ values: initialValues });
  };
  return (
    <div className={css.box}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={TasksSchema}
      >
        <Form className={css.form}>
          <div>
            <Field
              type="text"
              name="title"
              placeholder="Title"
              className={css.title}
            />
            <ErrorMessage name="title" component="span" />
          </div>
          <div>
            <Field
              as="textarea"
              name="description"
              placeholder="Description"
              className={css.text}
            />
            <ErrorMessage name="description" component="span" />
          </div>
          <button type="submit" className={css.addBtn}>
            <MdDownloadDone />
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddTask;
