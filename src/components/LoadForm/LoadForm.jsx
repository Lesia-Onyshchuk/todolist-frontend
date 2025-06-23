import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { fetchBoardById } from "../../redux/boards/operations";
import {
  selectCurrentBoard,
  SelectLoading,
  SelectError,
} from "../../redux/boards/selectors.js";

const LoadForm = () => {
  const initialValues = { boardId: "" };
  const dispatch = useDispatch();

  const board = useSelector(selectCurrentBoard);
  const loading = useSelector(SelectLoading);
  const error = useSelector(SelectError);

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

  const handleSubmit = (values, actions) => {
    dispatch(fetchBoardById(values.boardId));
    actions.resetForm({ values: initialValues });
  };

  console.log("BOARD", board);

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

      {loading && <p>Loading board...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && board && (
        <div>
          <p>{board.data.boardId}</p>
          <p>{board.data.name}</p>
        </div>
      )}
    </div>
  );
};

export default LoadForm;
