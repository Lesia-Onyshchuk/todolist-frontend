import { NavLink } from "react-router-dom";
// import AddBoard from "../AddBoard/AddBoard.jsx";

const Header = () => {
  return (
    <div>
      <NavLink to="/">Todolist</NavLink>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/boards">Boards</NavLink>
      </nav>
    </div>
  );
};

export default Header;
