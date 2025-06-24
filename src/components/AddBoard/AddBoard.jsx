import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { addBoard } from "../../redux/boards/operations";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import { selectCurrentBoard } from "../../redux/boards/selectors";

const AddBoard = () => {
  const initialValues = { name: "" };
  const dispatch = useDispatch();

  // const board = useSelector(selectCurrentBoard);

  console.log("Initial values:", initialValues);

  const navigate = useNavigate();

  const BoardSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(30, "Too Long!")
      .required("Required"),
  });

  const handleSubmit = (values, actions) => {
    dispatch(addBoard({ name: values.name }));
    toast.success(`Board ID ${values.name} successfully created!`, {
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
    actions.resetForm({ values: initialValues });
  };

  const handleLoadClick = () => {
    navigate("/boards");
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
          <button type="submit" onClick={handleLoadClick}>
            Create board
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddBoard;
