import { NavLink as NavlinkNestBook } from "react-router-dom";

export const NavLink = ({ to, children, ...props }) => {
  return (
    <NavlinkNestBook
      {...props}
      className={({ isActive }) => {
        return isActive ? "link is-active" : "link";
      }}
      to={to}
    >
      {children}
    </NavlinkNestBook>
  );
};
