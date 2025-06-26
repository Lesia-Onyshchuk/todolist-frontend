import React from "react";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import css from "./Header.module.css";
import { TbCircleDottedLetterT } from "react-icons/tb";

const activeClass = ({ isActive }: { isActive: boolean }) => {
  return clsx(css.link, isActive && css.isActive);
};

const Header: React.FC = () => {
  return (
    <div className={css.container}>
      <div className={css.header}>
        <NavLink to="/" className={css.logo}>
          <TbCircleDottedLetterT style={{ width: 38, height: 38 }} />
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
