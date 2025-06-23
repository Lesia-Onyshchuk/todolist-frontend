import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { addBoard } from "../../redux/boards/operations";

const AddBoard = () => {
  const initialValues = { name: "" };
  const dispatch = useDispatch();

  console.log("Initial values:", initialValues);

  const BoardSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(30, "Too Long!")
      .required("Required"),
  });

  const handleSubmit = (values, actions) => {
    dispatch(addBoard({ name: values.name }));
    actions.resetForm({ values: initialValues });
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={BoardSchema}
      >
        <Form>
          <Field type="text" name="name" placeholder="Enter a board name" />
          <ErrorMessage name="name" component="span" />
          <button type="submit">Create board</button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddBoard;
