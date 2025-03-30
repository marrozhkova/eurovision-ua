import { NavLink, Outlet } from "react-router-dom";

const Parent = () => {
  return (
    <>
      <nav>
        <NavLink to="/">Eurovision</NavLink>
        <NavLink className="nav-year" to="/ziferblat">
          Ziferblat
        </NavLink>
        <NavLink className="nav-trophy" to="/ruslana">
          Ruslana
        </NavLink>
        <NavLink className="nav-trophy" to="/jamala">
          Jamala
        </NavLink>
        <NavLink className="nav-trophy" to="/kalush">
          Kalush
        </NavLink>
        <NavLink className="nav-heart" to="/verka">
          Verka
        </NavLink>
      </nav>
      <div className="main-container">
        <Outlet />
      </div>
    </>
  );
};

export default Parent;
