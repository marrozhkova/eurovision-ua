import { NavLink, Outlet } from "react-router-dom";

const Parent = () => {
  return (
    <>
      <nav>
        <NavLink to="/">Eurovision</NavLink>
        <NavLink to="/ziferblat">Ziferblat</NavLink>
        <NavLink to="/ruslana">Ruslana</NavLink>
        <NavLink to="/jamala">Jamala</NavLink>
        <NavLink to="/kalush">Kalush</NavLink>
        <NavLink to="/verka">Verka</NavLink>
      </nav>
      <div className="main-container">
        <Outlet />
      </div>
      {/* This is where the child routes will be rendered */}
    </>
  );
};

export default Parent;
