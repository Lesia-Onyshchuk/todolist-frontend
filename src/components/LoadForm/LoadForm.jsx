import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { fetchBoardById } from "../../redux/boards/operations";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

const LoadForm = () => {
  const initialValues = { boardId: "" };
  const dispatch = useDispatch();
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

  const handleSubmit = async (values, actions) => {
    try {
      const result = await dispatch(fetchBoardById(values.boardId)).unwrap();
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
        <Form>
          <Field
            type="number"
            name="boardId"
            placeholder="Enter a board ID here..."
          />
          <ErrorMessage name="boardId" component="span" />
          <button type="submit">Load</button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoadForm;
