import AddBoard from "../../components/AddBoard/AddBoard.jsx";
import css from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={css.home}>
      <h1 className={css.title}>Organize your thoughts. Bring ideas to life</h1>
      <AddBoard />
    </div>
  );
};

export default HomePage;
