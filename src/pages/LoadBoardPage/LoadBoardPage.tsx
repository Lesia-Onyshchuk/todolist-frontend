import { FC } from "react";
import LoadForm from "../../components/LoadForm/LoadForm";
import css from "./LoadBoardPage.module.css";

const LoadBoardPage: FC = () => {
  return (
    <div className={css.loadBox}>
      <LoadForm />
    </div>
  );
};

export default LoadBoardPage;
