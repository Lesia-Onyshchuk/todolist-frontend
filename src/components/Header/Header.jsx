import clsx from "clsx";
import { NavLink } from "react-router-dom";
import css from "./Header.module.css";
import { TbCircleDottedLetterT } from "react-icons/tb";

const activeClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.isActive);
};

const Header = () => {
  return (
    <div className={css.container}>
      <div className={css.header}>
        <NavLink to="/" className={css.logo}>
          <TbCircleDottedLetterT style={{ width: "38px", height: "38px" }} />
        </NavLink>
        <nav className={css.nav}>
          <NavLink to="/" className={activeClass}>
            Home
          </NavLink>
          <NavLink to="/boards" className={activeClass}>
            Boards
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Header;
