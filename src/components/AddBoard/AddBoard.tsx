import React from "react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { addBoard } from "../../redux/boards/operations";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import css from "./AddBoard.module.css";
import type { AppDispatch } from "../../redux/store";

interface FormValues {
  name: string;
}

const AddBoard: React.FC = () => {
  const initialValues: FormValues = { name: "" };
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const BoardSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(30, "Too Long!")
      .required("Required"),
  });

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    try {
      const resultAction = await dispatch(addBoard({ name: values.name }));

      if (
        resultAction.meta.requestStatus === "fulfilled" &&
        typeof resultAction.payload === "object" &&
        resultAction.payload !== null &&
        "data" in resultAction.payload
      ) {
        const boardId = (resultAction.payload as any)?.data?.data?.boardId;

        if (boardId) {
          toast.success(`Board ID ${boardId} successfully created!`, {
            position: "top-right",
            autoClose: 2000,
            theme: "colored",
            transition: Bounce,
          });
        }
        navigate(`/boards/${boardId}`);
        actions.resetForm({ values: initialValues });
      } else {
        throw new Error("Unexpected response from server.");
      }
    } catch (error) {
      toast.error("Failed to create board.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={BoardSchema}
      >
        <Form className={css.addBoardBox}>
          <div className={css.inputBox}>
            <Field
              type="text"
              name="name"
              placeholder="Enter a board name"
              className={css.input}
            />
            <ErrorMessage name="name" component="span" className={css.error} />
          </div>
          <button type="submit" className={css.addBtn}>
            Create board
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddBoard;
