import React from "react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { fetchBoardById } from "../../redux/boards/operations";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import css from "./LoadForm.module.css";
import type { AppDispatch } from "../../redux/store";

interface FormValues {
  boardId: number | "";
}

const LoadForm: React.FC = () => {
  const initialValues: FormValues = { boardId: "" };
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const BoardIdSchema = Yup.object().shape({
    boardId: Yup.number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : Number(originalValue)
      )
      .typeError("Board ID must be a number")
      .integer()
      .min(100)
      .max(999)
      .required("Board ID is required"),
  });

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    try {
      const result = await dispatch(
        fetchBoardById(values.boardId.toString())
      ).unwrap();

      toast.success("Board successfully found!", {
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

      navigate(`/boards/${values.boardId}`);
    } catch (error) {
      toast.error("Board not found!", {
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
    } finally {
      actions.resetForm({ values: initialValues });
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={BoardIdSchema}
      >
        <Form className={css.loadBoardBox}>
          <div className={css.inputBox}>
            <Field
              type="number"
              name="boardId"
              placeholder="Enter a board ID here..."
              className={css.input}
            />
            <ErrorMessage
              name="boardId"
              component="span"
              className={css.error}
            />
          </div>
          <button type="submit" className={css.loadBtn}>
            Load
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoadForm;
