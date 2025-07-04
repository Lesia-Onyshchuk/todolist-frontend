import { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";

const Layout: FC = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
