import React from "react";
import { PuffLoader } from "react-spinners";
import css from "./Loader.module.css";

const Loader: React.FC = () => {
  return (
    <div className={css.loader}>
      <PuffLoader color="#367633" />
    </div>
  );
};

export default Loader;
