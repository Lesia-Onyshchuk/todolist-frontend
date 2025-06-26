import { FC } from "react";
import css from "./NotFoundPage.module.css";

const NotFoundPage: FC = () => {
  return (
    <p className={css.notFound}>404. Something went wrong. Page not found!</p>
  );
};

export default NotFoundPage;
