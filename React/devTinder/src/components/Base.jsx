import { Outlet } from "react-router";
import NavBar from "./Navbar";

const Base = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Base;
